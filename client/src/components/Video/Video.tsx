import Typography from '@material-ui/core/Typography/Typography';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { io } from 'socket.io-client';
import { getLocalStorage } from 'src/utils/localStorage';
import { checkOwnership } from '../../utils/checkOwnership';
import { VideoContainer } from './style';
import { VideoProps } from './types';

const socket = io('http://localhost:4000');

const Video: React.FC<VideoProps> = ({ ytVideoId, isOwner }) => {
	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
	const [secondsPlaying, setSecondsPlaying] = useState(0);
	const playerRef = useRef(null);

	const onPlayVideo = () => {
		socket.emit('isVideoPlaying', true);

		setIsVideoPlaying(true);
	};

	const onPauseVideo = () => {
		socket.emit('isVideoPlaying', false);

		setIsVideoPlaying(false);
	};

	const onBuffer = () => {
		if (
			playerRef.current.getCurrentTime() > 0 &&
			playerRef.current.getCurrentTime() !== null
		) {
			socket.emit('secondsPlaying', playerRef.current.getCurrentTime());
		}
	};

	useEffect(() => {
		if (getLocalStorage('isVideoPlaying')) {
			socket.emit('isVideoPlaying', isVideoPlaying);
		}

		socket.on('setIsVideoPlaying', (data) => {
			setIsVideoPlaying(data);
		});
	}, [isVideoPlaying, setIsVideoPlaying]);

	useEffect(() => {
		socket.on('setSecondsPlaying', (data) => {
			setSecondsPlaying(data);
		});
	}, [secondsPlaying, setSecondsPlaying]);

	return (
		<VideoContainer>
			{!ytVideoId ? (
				<Typography variant="h6" component="h6">
					{!checkOwnership(isOwner)
						? 'Please wait until owner will set an video'
						: 'Please set an youtube video'}
				</Typography>
			) : (
				<ReactPlayer
					ref={playerRef}
					controls={checkOwnership(isOwner)}
					onPlay={onPlayVideo}
					onPause={onPauseVideo}
					playing={isVideoPlaying}
					className="react-player"
					url={`https://www.youtube.com/watch?v=${ytVideoId}&t=${secondsPlaying}s`}
					width="500px"
					height="500px"
					style={!checkOwnership(isOwner) ? { pointerEvents: 'none' } : {}}
					onBuffer={onBuffer}
				/>
			)}
		</VideoContainer>
	);
};

export default Video;
