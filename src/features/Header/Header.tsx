import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading } from 'rebass';

import headerStyles from './Header.styles';
import urls from '../../shared/urls';

interface State {}
interface Props {
	className?: string;
}

class Header extends React.Component<Props, State> {

	render() {
		return (
			<header>
				<div className={this.props.className}>
					<HeaderHeadline level={1}>Hochzeit Lisa & Arne</HeaderHeadline>
				</div>
				<div>
					<Link to={urls.home}>Home</Link>
					<Link to={urls.countDown}>CountDown</Link>
					<Link to={urls.response}>Rückmeldung</Link>
				</div>
			</header>
		);

	}
}

const HeaderHeadline = Heading.extend`
	font-family: 'Great Vibes', cursive;
	font-size: 3em;
	line-height: 2;
`;

export { Header };
export default styled(Header)`${headerStyles}`;
