import * as React from 'react';
import styled, { StyledComponentClass, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Flex, ButtonProps } from 'rebass';

import headerStyles from './Header.styles';
import urls, { Route } from '../../shared/urls';
import reset from '../../common/reset';
import Button from '../../common/Button';


interface Props {
	className?: string;
}

class Header extends React.Component<Props> {

	openLink = (url: string) => window.open(url, '_self');

	renderLink = (route: Route) => {
		if (route.url === window.location.pathname) {
			return (
				<LinkButton onClick={this.openLink.bind(this, route.url)} tabIndex={-1} active={true}>
					<InvertedLink to={route.url}>{route.displayName.toUpperCase()}</InvertedLink>
				</LinkButton>
			);
		}
		return (
			<LinkButton onClick={this.openLink.bind(this, route.url)} tabIndex={-1} active={false}>
				<InvertedLink to={route.url}>{route.displayName.toUpperCase()}</InvertedLink>
			</LinkButton>
		);
	}

	render() {
		return (
			<div className={this.props.className}>
				<FlexMaxHeight justify-content="center" align="center">
					<ContainerMaxHeight>
						{this.renderLink(urls.home)}
						{this.renderLink(urls.party)}
						{this.renderLink(urls.response)}
						{this.renderLink(urls.wishList)}
						{this.renderLink(urls.cakeList)}
					</ContainerMaxHeight>
				</FlexMaxHeight>
			</div>
		);

	}
}

const ContainerMaxHeight = styled(Container)`
	height: 100%;
`;

const FlexMaxHeight = styled(Flex)`
	height: 100%;
`;

const InvertedLink = styled(Link)`
	${reset}
	color: #FFF;
	text-decoration: none;
	:focus {
		box-shadow: 0 0 0 2px #FFF;
	}
`;

const LinkButton = Button.extend`
	height: 100%;
	background-color: transparent;
	border-radius: 0;
	color: #FFFF;
	padding: 22px;
	cursor: pointer;

	:active {
		background-color: transparent;
	}
	&:after {
		content: '';
		width: 0%;
		height: 1px;
		display: block;
		padding-bottom: 4px;
		margin-bottom: -4px;
		border-bottom: 1px solid white;
		transition: width 0.2s ease-in-out;
	}
	${(props: any) => props.active && css`
		border: none;
		&:after {
			width: 100%;
		}
	`}
` as StyledComponentClass<ButtonProps & {active: boolean}, any>;


export { Header };
export default styled(Header)`${headerStyles}`;
