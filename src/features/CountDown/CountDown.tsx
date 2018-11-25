import * as React from 'react';

import Date from '../Date';
import { Container } from 'rebass';

interface State {}
interface Props {}

class CountDown extends React.Component<Props, State> {

	render() {
		return (
			<Container>
				<Date />
			</Container>
		);
	}
}

export default CountDown;
