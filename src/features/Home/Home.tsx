import * as React from 'react';
import { isLoggedIn, loginWithGoogle } from '../../services/authentication';

interface State {
	isLoggedIn: boolean;
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
			<p>
				Welcome to this page
				<button onClick={loginWithGoogle} hidden={this.state.isLoggedIn}>login</button>
			</p>
		);
	}
}

export default Home;
