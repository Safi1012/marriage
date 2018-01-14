import * as React from 'react';
import styled from 'styled-components';

import Icon from '../../common/Icon';
import headerStyles from './Header.styles';
import { Link } from 'react-router-dom';
import urls from '../../shared/urls';

interface State {}
interface Props {
	className?: string;
}

class Header extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<header>
				<div className={this.props.className}>
					<Icon className="icon" name="react" alt="React logo" />
					<h2>Welcome to React</h2>
				</div>
				<div>
					<Link to={urls.home}>Home</Link>
					<Link to={urls.countDown}>CountDown</Link>
				</div>
			</header>
		);

	}
}

export { Header };
export default styled(Header)`${headerStyles}`;
