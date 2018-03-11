import { css } from 'styled-components';
import theme from '../../common/theme';

const HeaderStyles = css`
	background-color: ${theme.colors.primaryColor};
	height: 150px;
	padding: 20px;
	color: white;
	text-align: center;

	.icon {
		animation: App-logo-spin infinite 20s linear;
		height: 80px;
		@keyframes App-logo-spin {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}
	}
`;

export default HeaderStyles;
