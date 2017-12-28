import * as React from 'react';
import './App.css';
import * as firebase from 'firebase';

const logo = require('./logo.svg');

interface State {
	date: string;
}
interface Props {}

class App extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = { date: '' };
	}

	componentDidMount() {
		const database = firebase.database ? firebase.database() : undefined;
		if (database) {
			const rootRef = database.ref().child('date');
			rootRef.on('value', (snap) => {
				this.setState({
					date: snap ? snap.val() : '',
				});
			});
		}
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
					{this.state.date}
				</p>
			</div>
		);
	}
}

export default App;
