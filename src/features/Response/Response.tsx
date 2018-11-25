import * as React from 'react';
import { Card, Heading, Box, Flex, ButtonOutline, Container } from 'rebass';
import { connect } from 'react-firebase';

import Button from '../../common/Button';
import Form from '../../common/Form';
import { App } from '../../services/firebase';
import addCurrentUser, { InjetedCurrentUserProps } from '../../hocs/addCurrentUser';
import PersonResponse from './PersonResponse';
import LoadingSpinner from '../../common/LoadingSpinner';

interface State {
	persons: PersonWithKey[];
	isLoading: boolean;
}

interface ExternalProps {}
interface FirebaseInjectedProps {
	persons: {[key: string]: Person};
	responded: boolean;
	addPerson: (person: Person) => any;
	updateResponded: (responded: boolean) => any;
	updatePerson: (person: PersonWithKey) => any;
	deleteResponse: (person: PersonWithKey) => any;
}
interface Props extends ExternalProps, InjetedCurrentUserProps, FirebaseInjectedProps {}

// meet, vegetarier, vegan switch
export interface Person {
	name: string;
	allergies: string;
}
export interface PersonWithKey extends Person {
	key: string;
}

class Response extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			persons: this.personPropsToPersonState(props.persons),
			isLoading: true,
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.persons !== this.props.persons) {
			this.setState({ persons: this.personPropsToPersonState(nextProps.persons) });
		}
		if (this.props.persons === undefined && nextProps.persons !== undefined) {
			this.setState({ isLoading: false });
		}
	}

	personPropsToPersonState(persons: {[key: string]: Person}) {
		if (persons) {
			return Object.entries(persons)
				.map(([ key, person ]: [string, Person]) => ({ ...person, key }));
		}
		return [];
	}

	onSubmit = (e: React.FormEvent<any>) => {
		e.preventDefault();
		this.props.updateResponded(!this.props.responded);
	}

	onPersonUpdate = (person: PersonWithKey) => {
		this.props.updatePerson(person);
	}

	deleteResponse = (person: PersonWithKey) => {
		this.props.deleteResponse(person);
	}

	addPerson = () => {
		this.props.addPerson({ name: '', allergies: '' });
	}

	personResponse = (person: PersonWithKey) => {
		return <PersonResponse key={person.key} person={person} onUpdate={this.onPersonUpdate} delete={this.deleteResponse} />;
	}

	render() {
		return (
			<Container>
				<Heading level={2}>Rückmeldung</Heading>
				{this.state.isLoading && <LoadingSpinner />}
				{!this.state.isLoading &&
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
				}
			</Container>
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
	updatePerson: (person: PersonWithKey) => ref(`response/${props.currentUser && props.currentUser.uid}/persons/${person.key}`).set({ name: person.name, allergies: person.allergies }),
	deleteResponse: (person: PersonWithKey) => ref(`response/${props.currentUser && props.currentUser.uid}/persons/${person.key}`).remove(),
});
export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(Response)
);
