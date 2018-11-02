import { css } from 'styled-components';
import theme from '../../common/theme';

const HeaderStyles = css`
	width: 100%;
	background: linear-gradient(${theme.colors.primaryColor}, ${theme.colors.primaryColorDark});
	box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
	color: white;
	text-align: center;
	position: sticky;
	top: 0;
	z-index: 99;
`;

export default HeaderStyles;
