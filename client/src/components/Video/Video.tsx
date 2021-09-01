import Typography from '@material-ui/core/Typography/Typography';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { io } from 'socket.io-client';
import { getLocalStorage } from 'src/utils/localStorage';
import { checkOwnership } from '../../utils/checkOwnership';
import { VideoContainer } from './style';
import { VideoProps } from './types';

const socket = io('http://localhost:4000');

const Video: React.FC<VideoProps> = ({ ytVideoId }) => {
	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

	const onPlayVideo = () => {
		socket.emit('isVideoPlaying', true);

		setIsVideoPlaying(true);
	};

	const onPauseVideo = () => {
		socket.emit('isVideoPlaying', false);

		setIsVideoPlaying(false);
	};

	useEffect(() => {
		if (getLocalStorage('isVideoPlaying')) {
			socket.emit('isVideoPlaying', isVideoPlaying);
		}

		socket.on('setIsVideoPlaying', (data) => {
			setIsVideoPlaying(data);
		});
	}, [isVideoPlaying, setIsVideoPlaying]);

	return (
		<VideoContainer>
			{!ytVideoId ? (
				<Typography variant="h6" component="h6">
					{!checkOwnership()
						? 'Please wait until owner will set an video'
						: 'Please set an youtube video'}
				</Typography>
			) : (
				<ReactPlayer
					controls={checkOwnership()}
					onPlay={onPlayVideo}
					onPause={onPauseVideo}
					playing={isVideoPlaying}
					className="react-player"
					url={`https://www.youtube.com/watch?v=${ytVideoId}`}
					width="500px"
					height="500px"
					style={!checkOwnership() ? { pointerEvents: 'none' } : {}}
				/>
			)}
		</VideoContainer>
	);
};

export default Video;
