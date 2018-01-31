import * as React from 'react';
import { Button } from 'rebass';

import { isLoggedIn, loginWithGoogle, logout } from '../../services/authentication';
import Counter from '../Counter/Counter';

interface State {
	isLoggedIn: boolean;
	user?: any;
}
interface Props {}

class Home extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		isLoggedIn.subscribe(isLoggedIn => this.setState({ isLoggedIn }));
	}

	render() {
		return (
			<div>
				<p>
					Welcome to this page
					<Button onClick={loginWithGoogle} hidden={this.state.isLoggedIn}>login</Button>
					<Button onClick={logout} hidden={!this.state.isLoggedIn}>logout</Button>
				</p>

				{this.state.isLoggedIn && <Counter />}
				{<Counter />}
			</div>
		);
	}
}

export default Home;
