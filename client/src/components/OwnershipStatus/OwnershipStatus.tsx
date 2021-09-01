import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { checkOwnership } from 'src/utils/checkOwnership';
import { OwnershipStatusText } from './style';
import { OwnershipStatusProps } from './types';

const OwnershipStatus: React.FC<OwnershipStatusProps> = ({}) => (
	<>
		<Typography variant="body2" component="h6">
			Ownership status:&nbsp;
			<OwnershipStatusText isOwner={checkOwnership()}>
				{checkOwnership().toString()}
			</OwnershipStatusText>
		</Typography>
	</>
);

export default OwnershipStatus;
