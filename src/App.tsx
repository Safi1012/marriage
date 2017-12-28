import * as React from 'react';

import './App.css';
import Date from './Date';

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

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
					<Date />
				</p>
			</div>
		);
	}
}

export default App;
