import * as React from 'react';
import { User } from 'firebase';
import { onAuthStateChanged, isLoggedIn, loginWithGoogle } from '../../services/authentication';

interface State {
	loggedInUser?: User;
}
interface Props {}

class Home extends React.Component<Props, State> {

	componentDidMount() {
		onAuthStateChanged.subscribe((user: any) => {
			console.log(user);
		});
		isLoggedIn.subscribe(update => console.log(update));
	}


	render() {
		return (
			<p>
				Welcome to this page
				<button onClick={loginWithGoogle}>login</button>
			</p>
		);
	}
}

export default Home;
