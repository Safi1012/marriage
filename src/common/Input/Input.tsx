import styled from 'styled-components';

import reset from '../reset';
import theme from '../theme';

export default styled.input`
	${reset}
	line-height: 1.15;
	border-width: 0 0 1px 0;
	border-style: solid;
	border-color: ${theme.colors.textcolor};
	width: 100%;
	margin-bottom: 12px;

	&:placeholder {
		color: red;
	}

	&:focus {
		outline: none;
		border-color: blue;
	}
	&:disabled {
		border-color: grey;
	}

`;
