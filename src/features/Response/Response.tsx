import * as React from 'react';
import { Card, Heading, Button, Box, Flex, ButtonOutline } from 'rebass';
import { connect } from 'react-firebase';

import Form from '../../common/Form';
import { App } from '../../services/firebase';
import addCurrentUser, { InjetedCurrentUserProps } from '../../hocs/addCurrentUser';
import PersonResponse from './PersonResponse';

interface State {
	persons: Person[];
}
interface ExternalProps {}
interface FirebaseInjectedProps {
	persons: Person[];
	addPerson: (person: Person) => any;
}
interface Props extends ExternalProps, InjetedCurrentUserProps, FirebaseInjectedProps {}

export interface Person {
	name: string;
	allergies: string;
}

class Response extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			persons: [ {
				name: '',
				allergies: 'none',
			} ],
		};
	}

	// THis is how the data should look
	state2 = {
		persons: [ {
			name: 'Arne',
			allergies: 'keine',
		} ],
	};
	// n = person.push()
	// n.key

	onSubmit = (e: React.FormEvent<any>) => {
		console.log('submit');
		e.preventDefault();
		console.log(this.state);
	}

	onPersonUpdate = (person: Person, index: number) => {
		const newPersons = this.state.persons.splice(0);
		newPersons[index] = person;
		this.setState({ persons: newPersons });
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
								<PersonResponse person={this.state.persons[0]} onUpdate={(person: Person) => this.onPersonUpdate(person, 0)} />

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

const mapFirebaseToProps = (props: Props, ref: any, firebase: App) => ({
	persons: `response/${props.currentUser && props.currentUser.uid}/persons`,
	addPerson: (person: Person) => ref(`response/${props.currentUser && props.currentUser.uid}/persons`).push(person),
});
export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(Response)
);
