import { getLocalStorage } from './localStorage';

export const checkOwnership = (isOwnerArg: boolean): boolean => {
	const isOwner: boolean | string = isOwnerArg || getLocalStorage('isOwner');

	if (isOwner === null) {
		return null;
	}

	if (isOwner !== null && typeof isOwner === 'string') {
		return JSON.parse(isOwner);
	}

	return !!isOwner;
};
