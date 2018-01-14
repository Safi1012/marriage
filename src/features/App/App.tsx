import * as React from 'react';
import styled from 'styled-components';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from '../Home';
import CountDown from '../CountDown';
import Header from '../Header';
import appStyles from './App.styles';
import urls from '../../shared/urls';

interface State {}
interface Props {
	className?: string;
}

class App extends React.Component<Props, State> {

	history: any;
	constructor(props: Props) {
		super(props);
		this.state = { date: '' };
		this.history = createBrowserHistory();
	}

	render() {
		return (
			<Router history={this.history}>
				<div className={this.props.className}>
					<Header />
					<main>
						<Route exact path={urls.home} component={Home} />
						<Route path={urls.countDown} component={CountDown} />
					</main>
				</div>
			</Router>
		);
	}
}

export default styled(App)`${appStyles}`;
