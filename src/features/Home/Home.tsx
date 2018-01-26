import * as React from 'react';

import { isLoggedIn, loginWithGoogle, onAuthStateChanged } from '../../services/authentication';
import Button from '../../common/Button/Button';

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
		onAuthStateChanged.subscribe((user: any) => console.log(user));
	}


	render() {
		return (
			<div>
				<p>
					Welcome to this page
					<button onClick={loginWithGoogle} hidden={this.state.isLoggedIn}>login</button>
				</p>

				<div>
					<Button brand="default">+</Button>
					<button>increase</button>
					<button>increase</button>
				</div>
			</div>
		);
	}
}

export default Home;
