import * as React from 'react';
import styled, { StyledComponentClass, css } from 'styled-components';
import { responsiveStyle } from 'styled-system';

import { isLoggedIn, loginWithGoogle, logout } from '../../services/authentication';
import Counter from '../Counter/Counter';
import Button from '../../common/Button';
import { Flex, Container } from 'rebass';
import theme from '../../common/theme';
import urls from '../../shared/urls';


interface State {
	isLoggedIn: boolean;
	user?: any;
}
interface Props {}

class Home extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		isLoggedIn.subscribe(isLoggedIn => this.setState({ isLoggedIn }));
	}

	render() {
		return (
			<div>
				<HeroImage src={require('./heroImage.jpg')} height={[ '40vh', '55vh', '65vh', '75vh' ]} />

				<Container>
					<Flex justify="center" align="center">
						<Heading fontSize={[ '100px', '120px' ]}>Willkommen</Heading>
					</Flex>
					<p>
						Wir trauen uns! Lisa & Arne werden am 99.99.2019 heiraten. Das ganze findet in der Musterstr 9 in Ettlingen statt.
						Außerdem solltet ihr nicht vergessen euch zurück zu melden.
					</p>
					<Flex justify="center">
						<Link href={urls.response.url}>
							<Button>
								Rückmeldung
							</Button>
						</Link>
					</Flex>

					{this.state.isLoggedIn && <Counter />}
					<Button onClick={loginWithGoogle} hidden={this.state.isLoggedIn}>login</Button>
					<Button onClick={logout} hidden={!this.state.isLoggedIn}>logout</Button>
				</Container>
			</div>
		);
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

interface ImageProps {
	src: string;
	height: string | number | string[] | number [];
}
const HeroImage = styled.div`
	margin-top: -20px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	${(props: ImageProps) => css`
		background-image: url(${props.src});
		${responsiveStyle({ cssProperty: 'height', prop: 'height' })({ height: props.height })}
	`}
` as StyledComponentClass<ImageProps, any>;

const Link = styled.a`
	cursor: pointer;
`;

export default Home;
