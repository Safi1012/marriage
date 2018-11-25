import * as React from 'react';
import styled from 'styled-components';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Container, Box } from 'rebass';

import Home from '../Home';
import Response from '../Response';
import WishList from '../WishList';
import Header from '../Header';
import Impressum from '../Impressum';
import appStyles from './App.styles';
import urls from '../../shared/urls';
import CakeList from '../CakeList';
import Footer from './Footer';
import Main from './Main';

interface Props {
	className?: string;
}

class App extends React.Component<Props> {

	history: any;
	constructor(props: Props) {
		super(props);
		this.history = createBrowserHistory();
	}

	render() {
		return (
			<Router history={this.history}>
				<div className={this.props.className}>
					<Box mb="20px">
						<Header />
					</Box>
					<Main>
						<Route exact path={urls.home.url} component={Home} />
						<Route path={urls.response.url} component={Response} />
						<Route path={urls.wishList.url} component={WishList} />
						<Route path={urls.cakeList.url} component={CakeList} />
						<Route path={urls.impressum.url} component={Impressum} />
					</Main>
					<Footer>
						<Container>
							<Link to={urls.impressum.url}>{urls.impressum.displayName}</Link>
						</Container>
					</Footer>
				</div>
			</Router>
		);
	}
}

export default styled(App)`${appStyles}`;
