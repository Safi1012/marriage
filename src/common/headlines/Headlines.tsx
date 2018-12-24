import styled, { StyledComponentClass, css } from 'styled-components';
import { responsiveStyle } from 'styled-system';
import theme from '../../common/theme';

const H1 = styled.h1`
	color: ${theme.colors.textColor};
	font-size: 120px;
	font-weight: 300;
	margin-top: 0;
	margin-bottom: 12px;
	font-family: 'Mr De Haviland', 'cursive';
	${(props: { fontSize: string | number | string[] | number [] }) => css`
		${responsiveStyle({ cssProperty: 'font-size', prop: 'fontSize' })({ fontSize: props.fontSize })}
	`}
` as StyledComponentClass<{ fontSize?: string | number | string[] | number [] }, any>;

const H2 = styled.h1`
	color: ${theme.colors.textColor};
	font-size: 40px;
	font-weight: 300;
	margin: 25px 0;
	font-family: 'Mr De Haviland', 'cursive';
	${(props: { fontSize: string | number | string[] | number [] }) => css`
		${responsiveStyle({ cssProperty: 'font-size', prop: 'fontSize' })({ fontSize: props.fontSize })}
	`}
` as StyledComponentClass<{ fontSize?: string | number | string[] | number [] }, any>;

export {
	H1,
	H2,
};
