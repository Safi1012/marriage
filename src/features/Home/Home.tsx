import * as React from 'react';
import { User } from 'firebase';
import { onAuthStateChanged } from '../../services/authentication';

interface State {
	loggedInUser?: User;
}
interface Props {}

class Home extends React.Component<Props, State> {

	componentDidMount() {
		onAuthStateChanged.subscribe(() => {
			console.log('HOME');
		});
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
