import * as React from 'react';
import styled from 'styled-components';

import Date from '../Date';
import Header from '../Header';
import appStyles from './App.styles';

interface State {}
interface Props {
	className?: string;
}

class App extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = { date: '' };
	}

	render() {
		return (
			<div className={this.props.className}>
			<Header />
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
					<Date />
				</p>
			</div>
		);
	}
}

export default styled(App)`${appStyles}`;
