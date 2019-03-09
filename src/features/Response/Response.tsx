import * as React from 'react';
import { Heading, Box, Flex, Container } from 'rebass';
import { connect } from 'react-firebase';

import Button, { GhostButton } from '../../common/Button';
import Form from '../../common/Form';
import { App } from '../../services/firebase';
import addCurrentUser, { InjectedCurrentUserProps } from '../../hocs/addCurrentUser';
import PersonResponse from './PersonResponse';
import GroupResponse from './GroupResponse';
import LoadingSpinner from '../../common/LoadingSpinner';
import { ResponseServerResponse, Person, adjustPersonFromServer } from './Response.types';
import Icon from '../../common/Icon';

interface State {
	persons: Person[];
	isLoading: boolean;
}

interface ExternalProps {}
interface FirebaseInjectedProps {
	response: ResponseServerResponse;
	updateResponded: (responded: boolean) => any;
	updatePerson: (person: Person) => any;
}
interface Props extends ExternalProps, InjectedCurrentUserProps, FirebaseInjectedProps {}


class Response extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			persons: [],
			isLoading: !props.response,
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.props.response === undefined && nextProps.response !== undefined) {
			this.setState({ isLoading: false });
		}
	}


	onSubmit = (e: React.FormEvent<any>) => {
		e.preventDefault();
		this.props.updateResponded(!this.props.response.responded);
	}

	onPersonUpdate = (person: Person) => {
		this.props.updatePerson(person);
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
									{adjustPersonFromServer(this.props.response.persons)
										.map((person: Person) => (
											<Box width={[ 1, 1, 0.5 ]} key={person.key}>
												<PersonResponse person={person} onUpdate={this.onPersonUpdate} responded={this.props.response.responded}/>
											</Box>
									))}
								</FullWithFlex>
								<GroupResponse email={this.props.response.email} song={this.props.response.song} />
								<Box mx="20px">
								<Box my="20px" mx={[ 0, 0, '20px' ]}>
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
						Danke das ihr euch zurückgemeldet habt.
					</p>
					<p>
						Sollest du doch noch etwas ändern wollen, kannst du das
						<GhostButton>
							<Flex align="center">
								<Box mr="6px">
									Formular ändern
								</Box>
								<Icon name="edit" alt=""/>
							</Flex>
						</GhostButton>
					</p>
				</div>
			);
		}
		return (
			<FullWithFlex justify="flex-end">
				<SubmitButton type="submit">
					<Flex align="center">
						<Box mr="6px">
							Rückmeldung Abschicken
						</Box>
						<Icon name="send" alt=""/>
					</Flex>
				</SubmitButton>
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
	response: `users/${props.currentUser && props.currentUser.uid}`,
	updateResponded: (responded: boolean) => ref(`users/${props.currentUser && props.currentUser.uid}/responded`).set(responded),
	updatePerson: (person: Person) => ref(`users/${props.currentUser && props.currentUser.uid}/persons/${person.key}`).set({ name: person.name, allergies: person.allergies, food: person.food, participate: person.participate }),
});
export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(Response)
);
