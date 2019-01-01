import * as React from 'react';
import styled from 'styled-components';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Flex } from 'rebass';

import Home from '../Home';
import Party from '../Party';
import Response from '../Response';
import WishList from '../WishList';
import Header from '../Header';
import Impressum from '../Impressum';
import Login from '../Login';
import appStyles from './App.styles';
import urls from '../../shared/urls';
import CakeList from '../CakeList';
import Footer from './Footer';
import Main from './Main';
import { logout } from '../../services/authentication';

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
					<Header />

					<Main>
						<Route exact path={urls.home.url} component={Home} />
						<Route path={urls.response.url} component={Response} />
						<Route path={urls.party.url} component={Party} />
						<Route path={urls.wishList.url} component={WishList} />
						<Route path={urls.cakeList.url} component={CakeList} />
						<Route path={urls.impressum.url} component={Impressum} />
						<Route path={urls.login.rawUrl} component={Login} />
					</Main>
					<Footer>
						<FlexFullWidth justify="space-between">
							<Link to={urls.impressum.url}>{urls.impressum.displayName}</Link>
							<Link to={urls.login.url()} onClick={logout}>Logout</Link>
						</FlexFullWidth>
					</Footer>
				</div>
			</Router>
		);
	}
}

const FlexFullWidth = Flex.extend`
	width: 100%;
`;

export default styled(App)`${appStyles}`;
