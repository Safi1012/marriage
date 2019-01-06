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
import { Subscription } from 'rxjs';


interface State {
	loginCode: string;
	isLoggedIn: boolean;
	error: boolean;
}
interface Props extends RouteComponentProps<{ loginCode?: string }> {}

class Login extends React.Component<Props, State> {

	private loginSubscription: Subscription;

	constructor(props: Props) {
		super(props);
		const loginCodeFromPath = this.props.match.params.loginCode;
		this.state = {
			loginCode: loginCodeFromPath ? loginCodeFromPath : '',
			isLoggedIn: false,
			error: false,
		};
	}

	componentDidMount() {
		this.loginSubscription = isLoggedIn.subscribe((isLoggedIn) => {
			this.setState({ isLoggedIn }, () => {
				if (isLoggedIn) {
					this.props.history.push(urls.home.url);
				} else {
					if (LoginCodePattern.test(this.state.loginCode)) {
						signIn(this.state.loginCode);
					}
				}
			});
		});
	}

	componentWillUnmount() {
		if (this.loginSubscription) {
			this.loginSubscription.unsubscribe();
		}
	}

	render() {
		return (
			<div>

				<Container>
					<Flex column justify="center" align="center" wrap>
						<Heading fontSize={[ '100px', '120px' ]}>Login</Heading>
						{this.state.isLoggedIn && this.renderLogout()}
						{!this.state.isLoggedIn && this.renderLogin()}

					</Flex>
				</Container>
			</div>
		);
	}

	renderLogout = () => <Button onClick={logout}>Logout</Button>;

	renderLogin = () => (
		<Box width={[ 1 , 0.5 ]} my="30px">
			<form onSubmit={this.handleSignInClick}>
				<Input type="text" placeholder="Logincode" value={this.state.loginCode} onChange={this.handleLoginCodeChange}/>
				<FlexFullWidth justify="flex-end">
					<Button type="submit" onClick={this.handleSignInClick}>Login</Button>
				</FlexFullWidth>
				{this.state.error && <p>Dein login hat leider nicht funktioniert, probiere es mit dem Code von der Einladung nocheinmal aus.</p>}
			</form>
		</Box>
	)

	handleSignInClick = (event: React.SyntheticEvent<any>) => {
		event.preventDefault();
		signIn(this.state.loginCode)
			.catch(res => this.setState({ error: true }));
	}

	handleLoginCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ loginCode: event.target.value });
	}
}

const FlexFullWidth = Flex.extend`
	width: 100%;
`;

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
