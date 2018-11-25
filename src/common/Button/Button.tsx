import styled from 'styled-components';

import { Button } from 'rebass';
import theme from '../theme';

export default styled(Button)`
	background-color: ${theme.colors.primaryColor};
	cursor: pointer;
`;
