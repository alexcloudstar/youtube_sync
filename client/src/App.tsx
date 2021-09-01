import React, { useEffect, useState } from 'react';
import { Video, YtLink } from './components';
import { io } from 'socket.io-client';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';
import Typography from '@material-ui/core/Typography/Typography';
import { OwnershipStatus } from 'components/OwnershipStatus';

const socket = io('http://localhost:4000');

const App = (): JSX.Element => {
	const [ytVideoId, setVideoId] = useState<string>(
		getLocalStorage('videoLink')
	);

	useEffect(() => {
		if (getLocalStorage('isOwner') === null) {
			setLocalStorage('isOwner', 'true');
			socket.emit('ownerExist', true);
		}

		socket.on('shouldBeOwner', (data) => {
			const shouldBeOwner = !data;
			setLocalStorage('isOwner', shouldBeOwner.toString());
		});
	}, []);

	useEffect(() => {
		if (getLocalStorage('videoLink')) {
			socket.emit('videoLink', getLocalStorage('videoLink'));
		}

		socket.on('setVideoLink', (data) => {
			setVideoId(data);
			setLocalStorage('videoLink', data);
		});
	}, []);

	return (
		<>
			<Typography variant="h5" component="h5">
				Youtube Sync
			</Typography>
			<OwnershipStatus />
			<YtLink ytVideoId={ytVideoId} setVideoId={setVideoId} />
			<Video ytVideoId={ytVideoId} />
		</>
	);
};

export default App;
