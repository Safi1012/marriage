import styled from 'styled-components';

import { Button } from 'rebass';
import theme from '../theme';

export default styled(Button)`
	background-color: ${theme.colors.primaryColor};
	cursor: pointer;
`;

export const GhostButton = styled(Button)`
	background-color: transparent;
	color: black;
	cursor: pointer;
	border: 2px solid ${theme.colors.textColorLight};
`;
