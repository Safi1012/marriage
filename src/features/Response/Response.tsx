import * as React from 'react';
import { Card, Heading, Button, Box, Flex, ButtonOutline } from 'rebass';
import { connect } from 'react-firebase';

import Form from '../../common/Form';
import { App } from '../../services/firebase';
import addCurrentUser, { InjetedCurrentUserProps } from '../../hocs/addCurrentUser';
import PersonResponse from './PersonResponse';

interface State {
	persons: Person[];
	responded: boolean;
}
interface ExternalProps {}
interface FirebaseInjectedProps {
	persons: Person[];
	responded: boolean;
	addPerson: (person: Person) => any;
	updateResponded: (responded: boolean) => any;
}
interface Props extends ExternalProps, InjetedCurrentUserProps, FirebaseInjectedProps {}

// meet, vegetarier, vegan switch
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
			responded: false,
		};
	}

	// n = person.push()
	// n.key

	onSubmit = (e: React.FormEvent<any>) => {
		e.preventDefault();
		this.props.updateResponded(!this.props.responded);
	}

	onPersonUpdate = (person: Person, index: number) => {
		const newPersons = this.state.persons.splice(0);
		newPersons[index] = person;
		this.setState({ persons: newPersons });
	}

	addPerson = () => {
		const newPersons = this.state.persons.splice(0);
		newPersons.push({ name: '', allergies: '' });
		this.setState({ persons: newPersons });
	}

	personResponse = (person: Person, index: number) => {
		return <PersonResponse key={index} person={this.state.persons[index]} onUpdate={(person: Person) => this.onPersonUpdate(person, index)} />
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
								{this.state.persons.map(this.personResponse)}

								<FullWithFlex justify="flex-end">
									<ButtonOutline onClick={this.addPerson} type="button">Einer Person mehr</ButtonOutline>
								</FullWithFlex>
							</Box>

							<FullWithFlex justify="flex-end">
								<SubmitButton type="submit">{this.props.responded ? 'Abgeschickt' : 'Abschicken'}</SubmitButton>
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
	responded: `response/${props.currentUser && props.currentUser.uid}/responded`,
	addPerson: (person: Person) => ref(`response/${props.currentUser && props.currentUser.uid}/persons`).push(person),
	updateResponded: (responded: boolean) => ref(`response/${props.currentUser && props.currentUser.uid}/responded`).set(responded),
});
export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(Response)
);
