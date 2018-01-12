import * as React from 'react';
import { User } from 'firebase';
import { onAuthStateChanged, isLoggedIn, isLoggedInSubject } from '../../services/authentication';

interface State {
	loggedInUser?: User;
}
interface Props {}

class Home extends React.Component<Props, State> {

	componentDidMount() {
		onAuthStateChanged.subscribe(() => {
			console.log('HOME');
		});
		isLoggedIn.subscribe(update => console.log(update));
		isLoggedInSubject.subscribe(console.log);
		console.log(isLoggedIn);
		console.log(isLoggedInSubject);
	}


	render() {
		return (
			<p>
				Welcome to this page
			</p>
		);
	}
}

export default Home;
