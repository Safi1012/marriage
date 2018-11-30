import * as React from 'react';
import { Flex, Box } from 'rebass';

export interface Props {
	className?: string;
	time: string;
	description: string;
}

class TimetableSlot extends React.Component<Props> {
	render() {
		return (
			<Flex wrap >
				<Box width={[ 1, 1, 0.17 ]} mb="3px">
					<b>{this.props.time}</b>
				</Box>
				<Box width={[ 1, 1, 0.83 ]} mb="12px">
					{this.props.description}
				</Box>
			</Flex>
		);
	}
}

export default TimetableSlot;

