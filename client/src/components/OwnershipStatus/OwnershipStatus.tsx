import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { checkOwnership } from 'src/utils/checkOwnership';
import { OwnershipStatusText } from './style';
import { OwnershipStatusProps } from './types';

const OwnershipStatus: React.FC<OwnershipStatusProps> = ({ isOwner }) => (
	<>
		<Typography variant="body2" component="h6">
			Ownership status:&nbsp;
			<OwnershipStatusText isOwner={checkOwnership(isOwner)}>
				{checkOwnership(isOwner)?.toString()}
			</OwnershipStatusText>
		</Typography>
	</>
);

export default OwnershipStatus;
