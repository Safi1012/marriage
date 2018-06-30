import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading, Container, ButtonOutline } from 'rebass';

import headerStyles from './Header.styles';
import urls, { Route } from '../../shared/urls';
import theme from '../../common/theme';

interface State {}
interface Props {
	className?: string;
}

class Header extends React.Component<Props, State> {

	renderLink = (route: Route) => {
		return (
			<ButtonOutline>
				<Link to={route.url}>{route.displayName}</Link>
			</ButtonOutline>
		);
	}

	render() {
		return (
			<StyledHeader>
				<div className={this.props.className}>
					<HeaderHeadline level={1}>Hochzeit Lisa & Arne</HeaderHeadline>
				</div>
				<Container p={3}>
					{this.renderLink(urls.home)}
					{this.renderLink(urls.countDown)}
					{this.renderLink(urls.response)}
					{this.renderLink(urls.wishList)}
				</Container>
			</StyledHeader>
		);

	}
}

const HeaderHeadline = Heading.extend`
	font-family: 'Great Vibes', cursive;
	font-size: 3em;
	line-height: 2;
`;

const StyledHeader = styled.header`
	border-bottom: 3px solid ${theme.colors.primaryColor};
`;

export { Header };
export default styled(Header)`${headerStyles}`;
