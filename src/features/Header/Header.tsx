import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading, Container, Button } from 'rebass';

import headerStyles from './Header.styles';
import urls, { Route } from '../../shared/urls';
import theme from '../../common/theme';

interface State {}
interface Props {
	className?: string;
}

class Header extends React.Component<Props, State> {

	openLink = (url: string) => window.open(url, '_self');

	renderLink = (route: Route) => {
		if (route.url === window.location.pathname) {
			return (
				<ActiveLinkButton onClick={this.openLink.bind(this, route.url)}>
					<InvertedLink tabIndex={-1} to={route.url}>{route.displayName}</InvertedLink>
				</ActiveLinkButton>
			);
		}
		return (
			<LinkButton onClick={this.openLink.bind(this, route.url)}>
				<InvertedLink tabIndex={-1} to={route.url}>{route.displayName}</InvertedLink>
			</LinkButton>
		);
	}

	render() {
		return (
			<StyledHeader>
				<div className={this.props.className}>
					<HeaderHeadline level={1}>Hochzeit Lisa & Arne</HeaderHeadline>
				</div>
				<Container>
					{this.renderLink(urls.home)}
					{this.renderLink(urls.countDown)}
					{this.renderLink(urls.response)}
					{this.renderLink(urls.wishList)}
				</Container>
			</StyledHeader>
		);

	}
}

const InvertedLink = styled(Link)`
	color: #FFF;
`;

const LinkButton = Button.extend`
	background-color: ${theme.colors.lightRed};
	border-radius: 0;
	color: #FFFF;
	margin: 2px;

	:active {
		background-color: ${theme.colors.lightRed};
	}
	:focus {
		box-shadow: 0 0 0 2px #FFF;
	}
`;

const ActiveLinkButton = LinkButton.extend`
	background-color: ${theme.colors.primaryColor};
	margin: 0;
	border: none;
	box-shadow: 0 0 0 2px ${theme.colors.primaryColor};

`;

const HeaderHeadline = Heading.extend`
	font-family: 'Great Vibes', cursive;
	font-size: 3em;
	line-height: 2;
`;

const StyledHeader = styled.header`
	background-color: ${theme.colors.lightRed};
	margin-bottom: 15px;
`;

export { Header };
export default styled(Header)`${headerStyles}`;
