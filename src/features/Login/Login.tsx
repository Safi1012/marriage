import * as React from 'react';
import styled, { StyledComponentClass, css } from 'styled-components';
import { responsiveStyle } from 'styled-system';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { isLoggedIn, signIn, logout, LoginCodePattern } from '../../services/authentication';
import Button from '../../common/Button';
import { Flex, Container, Box } from 'rebass';
import theme from '../../common/theme';
import Input from '../../common/Input';
import urls from '../../shared/urls';


interface State {
	loginCode: string;
	isLoggedIn: boolean;
}
interface Props extends RouteComponentProps<{ loginCode?: string }> {}

class Login extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		const loginCodeFromPath = this.props.match.params.loginCode;
		this.state = {
			loginCode: loginCodeFromPath ? loginCodeFromPath : '',
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		isLoggedIn.subscribe((isLoggedIn) => {
			this.setState({ isLoggedIn });
			console.log('sub');
			if (isLoggedIn) {
				console.log('logged in');
				this.props.history.push(urls.home.url);
			} else {
				console.log('Not logged in');
				console.log(this.state.loginCode);
				if (LoginCodePattern.test(this.state.loginCode)) {
					console.log('loggin in');
					signIn(this.state.loginCode);
				}
			}
		});
	}

	render() {
		return (
			<div>

				<Container>
					<Flex justify="center" align="center">
					<Box width={1}>
						<Heading fontSize={[ '100px', '120px' ]}>Login</Heading>
					</Box>
					{this.state.isLoggedIn && this.renderLogout()}
					{!this.state.isLoggedIn && this.renderLogin()}

					</Flex>
				</Container>
			</div>
		);
	}

	renderLogout = () => <Button onClick={logout}>Logout</Button>;

	renderLogin = () => (
		<Box width={1} >
			<Input type="text" placeholder="Logincode" value={this.state.loginCode} onChange={this.handleLoginCodeChange}/>
			<Button onClick={this.handleSignInClick}>Login</Button>
		</Box>
	)

	handleSignInClick = () => signIn(this.state.loginCode);

	handleLoginCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ loginCode: event.target.value });
	}
}

const Heading = styled.h1`
	font-size: 120px;
	font-weight: 300;
	color: ${theme.colors.textColor};
	margin-top: 0;
	margin-bottom: 12px;
	font-family: 'Mr De Haviland', 'cursive';
	${(props: { fontSize: string | number | string[] | number [] }) => css`
		${responsiveStyle({ cssProperty: 'font-size', prop: 'fontSize' })({ fontSize: props.fontSize })}
	`}
` as StyledComponentClass<{ fontSize: string | number | string[] | number [] }, any>;

export default withRouter(Login);
