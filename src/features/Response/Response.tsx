import * as React from 'react';
import { Card, Heading, Button, Box, Flex, Input, ButtonOutline } from 'rebass';

import Form from '../../common/Form';

interface State {
	name: string;
}
interface Props {}

class Response extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			name: '',
		};
	}

	onSubmit = (e: React.FormEvent<any>) => {
		console.log('submit');
		e.preventDefault();
	}

	updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ name: event.target.value });
	}

	render() {
		return (
			<div>
				<Heading level={2}>Rückmeldung</Heading>
				<Card>
					<Box p={2}>
						Wir kommen mit:
						<Form onSubmit={this.onSubmit}>

							<Box mb={4}>
								<Box my={2}>
									<Input placeholder="Name" type="text" value={this.state.name} onChange={this.updateName}/>
									<Box ml={5} my={2} >
										<Input placeholder="Unverträglichkeit" type="text" value={this.state.name} onChange={this.updateName}/>
									</Box>
								</Box>
								<FullWithFlex justify="flex-end">
									<ButtonOutline>Einer Person mehr</ButtonOutline>
								</FullWithFlex>
							</Box>

							<FullWithFlex justify="flex-end">
								<SubmitButton type="submit">Abschicken</SubmitButton>
							</FullWithFlex>
						</Form>
					</Box>
				</Card>
			</div>
		);
	}
}


const FullWithFlex = Flex.extend`
	width: 100%;
`;
const SubmitButton = Button.extend`
	float: right;
`;

export default Response;

