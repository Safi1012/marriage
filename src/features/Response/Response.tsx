import * as React from 'react';
import { Heading, Box, Flex, Container } from 'rebass';
import { connect } from 'react-firebase';
import styled from 'styled-components';

import theme from '../../common/theme';
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
				<Box ml={[ 0, 0 , '15px' ]}>
					<Heading level={2}>Rückmeldung</Heading>
				</Box>
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
								<GroupResponse email={this.props.response.email} song={this.props.response.song} responded={this.props.response.responded} />
								<Box my="20px" mx={[ 0, 0, '15px' ]}>
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
		return (
			<FullWithFlex justify="space-between">
				{responded ? (
					<GhostButton>
						<Flex align="center">
							<Box mr="6px">
								Anpassen
							</Box>
							<Icon name="edit" alt="Formular ändern icon" />
						</Flex>
					</GhostButton>
				) : (
					<div />
				)}

				{responded ? (
					<Flex align="center">
					<Box mr="6px">
						<SuccessText>Erfolgreich</SuccessText>
					</Box>
					<Icon name="check" alt="Rückmeldung erfolgreich icon" />
				</Flex>
				) : (
					<SubmitButton type="submit">
						<Flex align="center">
							<Box mr="6px">
								Abschicken
							</Box>
							<Icon name="send" alt="Formular absenden icon" />
						</Flex>
					</SubmitButton>
				)}
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

const SuccessText = styled.p`
	color: ${theme.colors.successColor};
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
