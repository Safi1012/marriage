import * as React from 'react';
import { Card, Heading, Button } from 'rebass';

interface State {}
interface Props {}

class Response extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Heading level={2}>Rückmeldung</Heading>
				<Card>
					Hallo
					<SubmitButton>Abschicken</SubmitButton>
				</Card>
			</div>
		);
	}
}


const SubmitButton = Button.extend`
	position: absolute;
	right: 5px;
	bottom: 5px;
`;

export default Response;

