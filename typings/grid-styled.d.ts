declare module 'grid-styled' {
	import * as React from 'react';
	import { StyledComponentClass } from 'styled-components';

	export type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
	export type Align = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

	interface FlexProps {
		align?: Align;
		justify?: Justify;
		order?: number;
		wrap?: boolean;
		column?: boolean;
		className?: string;
		id?: string;
	}
	export const Flex: StyledComponentClass<FlexProps, any>;

	interface BoxProps {
		width?: number | string | number[];
		m?: number | string | (number | string)[];
		mt?: number | string | (number | string)[];
		mr?: number | string | (number | string)[];
		mb?: number | string | (number | string)[];
		ml?: number | string | (number | string)[];
		mx?: number | string | (number | string)[];
		my?: number | string | (number | string)[];
		p?: number | string | (number | string)[];
		pt?: number | string | (number | string)[];
		pr?: number | string | (number | string)[];
		pb?: number | string | (number | string)[];
		pl?: number | string | (number | string)[];
		px?: number | string | (number | string)[];
		py?: number | string | (number | string)[];
		order?: number | string | (number | string)[];
		flex?: string;
		id?: string;
		className?: string;
		is?: string;
	}
	export const Box: StyledComponentClass<BoxProps, any>

	export const Grid: StyledComponentClass<BoxProps, any>
}
