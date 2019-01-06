import * as React from 'react';
import styled from 'styled-components';
import { Container } from 'rebass';

import theme from '../../../common/theme';

interface Props {}
class Footer extends React.PureComponent<Props> {

	render() {
		return (
			<footer>
				<Container>
					{this.props.children}
				</Container>
			</footer>
		);
	}
}

export default styled(Footer)`
	margin-top: 20px;
	padding: 1rem;
	text-align: right;
	* {
		color: #FFF;
	}
	background-color: ${theme.colors.primaryColor}
`;
