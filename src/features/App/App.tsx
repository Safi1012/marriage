import * as React from 'react';
import styled from 'styled-components';
import { Route, RouteComponentProps, withRouter, Switch } from 'react-router';
import { Link } from 'react-router-dom';
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
import { logout, isLoggedIn } from '../../services/authentication';
import Button from '../../common/Button';

interface Props extends RouteComponentProps<{}> {
	className?: string;
}

class App extends React.Component<Props> {

	constructor(props: Props) {
		super(props);
		isLoggedIn.subscribe(loggedIn => !loggedIn && props.history.push(urls.login.url()));
	}

	handleLogout = () => {
		logout()
			.then(() => this.props.history.push(urls.login.url()));
	}

	render() {
		return (
			<div className={this.props.className}>
				<Header />

				<Main>
					<Switch>
						<Route exact path={urls.home.url} component={Home} />
						<Route path={urls.response.url} component={Response} />
						<Route path={urls.party.url} component={Party} />
						<Route path={urls.wishList.url} component={WishList} />
						<Route path={urls.cakeList.url} component={CakeList} />
						<Route path={urls.impressum.url} component={Impressum} />
						<Route path={urls.login.rawUrl} component={Login} />
						<Route component={Home} />
					</Switch>
				</Main>
				<Footer>
					<FlexFullWidth justify="space-between" align="center">
						<Link to={urls.impressum.url}>{urls.impressum.displayName}</Link>
						<LinkButton onClick={this.handleLogout}>Logout</LinkButton>
					</FlexFullWidth>
				</Footer>
			</div>
		);
	}
}

const FlexFullWidth = Flex.extend`
	width: 100%;
`;

const LinkButton = styled(Button)`
	background: none;
	color: rgb(85, 26, 139);
	text-decoration: underline;
	font-size: 16px;
	font-weight: 400;
`;

export default withRouter(styled(App)`${appStyles}`);
