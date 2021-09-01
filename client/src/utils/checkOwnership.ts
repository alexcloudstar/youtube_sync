import { getLocalStorage } from './localStorage';

export const checkOwnership = (): boolean => {
	const isOwner = getLocalStorage('isOwner');

	if (isOwner === null) {
		return null;
	}

	if (isOwner !== null) {
		return JSON.parse(isOwner);
	}
};
