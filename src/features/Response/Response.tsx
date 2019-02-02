import * as React from 'react';
import { Heading, Box, Flex, Container } from 'rebass';
import { connect } from 'react-firebase';

import Button, { GhostButton } from '../../common/Button';
import Form from '../../common/Form';
import { App } from '../../services/firebase';
import addCurrentUser, { InjetedCurrentUserProps } from '../../hocs/addCurrentUser';
import PersonResponse from './PersonResponse';
import LoadingSpinner from '../../common/LoadingSpinner';
import Label from '../../common/Label';
import Input from '../../common/Input';

interface State {
	persons: Person[];
	isLoading: boolean;
	mailUpdate: string;
}

interface ExternalProps {}
interface FirebaseInjectedProps {
	persons: {[key: string]: PersonServerResponse};
	responded: boolean;
	mailUpdate: string;
	addPerson: (person: PersonServerResponse) => any;
	updateResponded: (responded: boolean) => any;
	updatePerson: (person: Person) => any;
	deleteResponse: (person: Person) => any;
}
interface Props extends ExternalProps, InjetedCurrentUserProps, FirebaseInjectedProps {}

export enum Participate {
	Yes = 'Ja',
	No = 'Nein',
}

export enum Food {
	Meet = 'Fleisch',
	Vegetary = 'Vegetarisch',
	Vegan = 'Vegan',
	Nothing = 'Nichts',
}

export interface PersonServerResponse {
	name: string;
	participate: Participate;
	food: Food;
	allergies: string;
}
export interface Person extends PersonServerResponse {
	key: string;
}

class Response extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			persons: this.personPropsToPersonState(props.persons),
			isLoading: !props.persons,
			mailUpdate: '',
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

	personPropsToPersonState(persons: {[key: string]: PersonServerResponse}) {
		if (persons) {
			return Object.entries(persons)
				.map(([ key, person ]: [string, PersonServerResponse]) => ({ ...person, key }));
		}
		return [];
	}

	onSubmit = (e: React.FormEvent<any>) => {
		e.preventDefault();
		this.props.updateResponded(!this.props.responded);
	}

	onPersonUpdate = (person: Person) => {
		this.props.updatePerson(person);
	}

	onMailUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ mailUpdate: event.target.value });
	}


	render() {
		return (
			<Container>
				<Heading level={2}>Rückmeldung</Heading>
				{this.state.isLoading && <LoadingSpinner />}
				{!this.state.isLoading &&
					<Box>
						<Form onSubmit={this.onSubmit}>
							<div>
								<FullWithFlex justify="space-between" wrap>
									{this.state.persons.map((person: Person) => (
											<Box width={[ 1, 1, 0.5 ]} key={person.key}>
												<PersonResponse person={person} onUpdate={this.onPersonUpdate} responded={this.props.response.responded}/>
											</Box>
									))}
								</FullWithFlex>

								<Box mx="20px">
									<p>
										<Label htmlFor="mailUpdates">E-Mail für Updates:</Label>
									</p>
									<Input placeholder="z.B. Arne_Maier@gmx.de" type="text" id="mailUpdates" value={this.props.response.mailUpdate} onChange={this.onMailUpdate} disabled={this.props.response.responded}/>

									{this.getSubmit(this.props.response.responded)}

								</Box>
							</div>
						</Form>
					</Box>
				}
			</Container>
		);
	}

	getSubmit = (responded: boolean) => {
		if (responded) {
			return (
				<div>
					<p>
						Danke das ihr euch zurückgemledet habt.
					</p>
					<p>
						Sollest du doch noch etwas ändern wollen, kannst du das <GhostButton>Formular ändern</GhostButton>
					</p>
				</div>
			);
		}
		return (
			<FullWithFlex justify="flex-end">
				<SubmitButton type="submit">Abschicken</SubmitButton>
			</FullWithFlex>
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
	persons: `users/${props.currentUser && props.currentUser.uid}`,
	responded: `users/${props.currentUser && props.currentUser.uid}/responded`,
	mailUpdate: `users/${props.currentUser && props.currentUser.uid}/mailUpdate`,
	updateResponded: (responded: boolean) => ref(`users/${props.currentUser && props.currentUser.uid}/responded`).set(responded),
	updatePerson: (person: Person) => ref(`users/${props.currentUser && props.currentUser.uid}/persons/${person.key}`).set({ name: person.name, allergies: person.allergies, food: person.food, participate: person.participate }),
});
export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(Response)
);
