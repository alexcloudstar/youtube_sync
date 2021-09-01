import styled from 'styled-components';

export const OwnershipStatusText = styled.span<{ isOwner: boolean }>`
	color: ${({ isOwner }) => (isOwner ? 'green' : 'red')};
`;
