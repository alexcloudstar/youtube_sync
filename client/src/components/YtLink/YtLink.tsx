import React, { useState } from 'react';
import { checkOwnership } from 'src/utils/checkOwnership';
import { setLocalStorage } from 'src/utils/localStorage';
import { YtLinkWrapper } from './style';
import { YtLinkProps } from './types';
import { io } from 'socket.io-client';
import { Button, TextField } from '@material-ui/core';

const socket = io('http://localhost:4000');

const YtLink: React.FC<YtLinkProps> = ({ ytVideoId, setVideoId }) => {
	const [youtubeLinkInput, setYoutubeLinkInput] = useState<string>('');
	const [showYoutubeInput, setShowYoutubeInput] = useState<boolean>(true);

	const onChange = (e) => {
		setYoutubeLinkInput(e.target.value);
		let video_id = e.target.value.split('v=')[1];

		const ampersandPosition = video_id?.indexOf('&');
		if (ampersandPosition !== -1) {
			video_id = ampersandPosition && video_id.substring(0, ampersandPosition);
		}
		setVideoId(video_id);
		setLocalStorage('videoLink', video_id);

		socket.emit('videoLink', video_id);
	};

	const onClick = () => {
		setShowYoutubeInput(!showYoutubeInput);
	};

	if (!checkOwnership()) return <></>;

	return (
		<YtLinkWrapper>
			<form onSubmit={(e) => e.preventDefault()}>
				{showYoutubeInput && (
					<TextField
						type="text"
						value={youtubeLinkInput}
						placeholder="Please input your youtube link"
						onChange={onChange}
					/>
				)}

				<Button
					variant="contained"
					color="secondary"
					type="submit"
					onClick={onClick}
				>
					{showYoutubeInput ? 'Hide input' : 'Show input'}
				</Button>
			</form>
		</YtLinkWrapper>
	);
};

export default YtLink;
