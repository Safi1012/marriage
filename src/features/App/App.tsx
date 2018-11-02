import * as React from 'react';
import styled from 'styled-components';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Container } from 'rebass';

import Home from '../Home';
import CountDown from '../CountDown';
import Response from '../Response';
import WishList from '../WishList';
import Header from '../Header';
import appStyles from './App.styles';
import urls from '../../shared/urls';
import CakeList from '../CakeList';

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
						<Container>
							<Route exact path={urls.home.url} component={Home} />
							<Route path={urls.countDown.url} component={CountDown} />
							<Route path={urls.response.url} component={Response} />
							<Route path={urls.wishList.url} component={WishList} />
							<Route path={urls.cakeList.url} component={CakeList} />
						</Container>
					</main>
				</div>
			</Router>
		);
	}
}

export default styled(App)`${appStyles}`;
