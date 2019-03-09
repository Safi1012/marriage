import * as React from 'react';
import { Heading, Button, Container } from 'rebass';
import { connect } from 'react-firebase';

import { App } from '../../services/firebase';
import addCurrentUser, { InjectedCurrentUserProps } from '../../hocs/addCurrentUser';
import Input from '../../common/Input/Input';
import Label from '../../common/Label';


interface State {
	title: string;
	bakedBy: string;
}

interface ExternalProps {}
interface FirebaseInjectedProps {
	cakes: {[key: string]: Cake};
	removeCake: (key: string) => any;
	addCake: (cake: Cake) => any;
}
interface Props extends ExternalProps, FirebaseInjectedProps, InjectedCurrentUserProps {}

export interface Cake {
	title: string;
	bakedBy: string;
	creator?: string;
}
export interface CakeWithKey extends Cake {
	key: string;
}

class CakeList extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			title: '',
			bakedBy: '',
		};
	}

	updateTitle = (title: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: title.target.value });
	updateBakedBy = (bakedBy: React.ChangeEvent<HTMLInputElement>) => this.setState({ bakedBy: bakedBy.target.value });

	removeCake = (key: string) => {
		this.props.removeCake(key);
	}

	addCake = () => {
		this.props.addCake({
			title: this.state.title,
			bakedBy: this.state.bakedBy,
			creator: this.props.currentUser && this.props.currentUser.uid,
		});
		this.setState({
			title: '',
			bakedBy: '',
		});
	}

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.addCake();
	}

	renderCake = (cake: CakeWithKey) => (
		<tr key={cake.key}>
			<td>{cake.title}</td>
			<td>{cake.bakedBy}</td>
			<td>
				{this.props.currentUser && this.props.currentUser.uid === cake.creator && <Button onClick={this.removeCake.bind(this, cake.key)}>Entfernen</Button>}
			</td>
		</tr>
	)

	render() {
		return (
			<Container>
				<Heading level={2}>Kuchenübersicht</Heading>
				<table>
					<thead>
						<tr>
							<td>
								<Label htmlFor="title">Kuchennamen</Label>
							</td>
							<td>
								<Label htmlFor="bakedBy">Name</Label>
							</td>
							<td/>
						</tr>
					</thead>
					<tbody>
						{objectToArray(this.props.cakes).map(this.renderCake)}
						<tr>
							<td>
								<form onSubmit={this.handleSubmit}>
									<Input id="title" required placeholder="Was?" type="text" value={this.state.title} onChange={this.updateTitle} />
								</form>
							</td>
							<td>
								<form onSubmit={this.handleSubmit}>
									<Input id="bakedBy" required placeholder="Wer?" type="text" value={this.state.bakedBy} onChange={this.updateBakedBy} />
								</form>
							</td>
							<td>
								<Button onClick={this.addCake} disabled={this.state.title === '' || this.state.bakedBy === ''}>
									Add
								</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</Container>
		);
	}
}

const objectToArray = (object: {[key: string]: Cake}): CakeWithKey[] => {
	if (object) {
		return Object.entries(object)
			.map(([ key, innerObject ]) => ({ ...innerObject, key }));
	}
	return [];
};

const mapFirebaseToProps = (props: Props, ref: any, firebase: App) => ({
	cakes: `cakes`,
	addCake: (cake: Cake) => ref(`cakes/`).push(cake),
	removeCake: (key: string) => ref(`cakes/${key}`).remove(),
});

export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(CakeList)
);
