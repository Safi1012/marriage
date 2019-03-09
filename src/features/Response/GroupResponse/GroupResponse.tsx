import * as React from 'react';
import { connect } from 'react-firebase';

import { App } from '../../../services/firebase';
import addCurrentUser, { InjectedCurrentUserProps } from '../../../hocs/addCurrentUser';
import { ResponseServerResponse, Person } from '../Response.types';
import Input from '../../../common/Input';
import Card from '../../../common/Card';

interface State {}
interface ExternalProps {
	email: string;
	song: string;
}
interface FirebaseInjectedProps {
	response: ResponseServerResponse;
	updateResponded: (responded: boolean) => any;
	updatePerson: (person: Person) => any;
	updateEmail: (email: string) => any;
	updateSong: (song: string) => any;
}
interface Props extends ExternalProps, InjectedCurrentUserProps, FirebaseInjectedProps {}

class GroupResponse extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	onEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.updateEmail(event.target.value);
	}

	onSong = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.updateSong(event.target.value);
	}

	render() {
		const { email, song } = this.props;

		return (
			<Card>
				<div>
					<p>Email</p>
					<Input placeholder="Max.Musterman@gmx.de" type="text" value={email} onChange={this.onEmail} />

					<p>Liedwunsch</p>
					<Input placeholder="Michael Jackson - Thriller 1982" type="text" value={song} onChange={this.onSong} />
				</div>
			</Card>
		);
	}
}

const mapFirebaseToProps = (props: Props, ref: any, firebase: App) => ({
	response: `users/${props.currentUser && props.currentUser.uid}`,
	updateResponded: (responded: boolean) => ref(`users/${props.currentUser && props.currentUser.uid}/responded`).set(responded),
	updatePerson: (person: Person) => ref(`users/${props.currentUser && props.currentUser.uid}/persons/${person.key}`).set({ name: person.name, allergies: person.allergies, food: person.food, participate: person.participate }),
	updateEmail: (email: string) => ref(`users/${props.currentUser && props.currentUser.uid}/email`).set(email),
	updateSong: (song: string) => ref(`users/${props.currentUser && props.currentUser.uid}/song`).set(song),
});
export default addCurrentUser<ExternalProps>()(
	connect(
		mapFirebaseToProps
	)(GroupResponse)
);
