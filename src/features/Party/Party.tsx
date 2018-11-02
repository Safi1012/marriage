import * as React from 'react';
import styled, { StyledComponentClass, css } from 'styled-components';


export interface Props {
	className?: string;
}

class Party extends React.Component<Props> {
	render() {
		return (
			<div>
				<Heading>Örtlichkeit</Heading>
				<Image src={require('./kasino_ettlingen_1.jpg')} />
				<Heading>Programm</Heading>
					12 Uhr		Do it
				<Heading>Anfahrt</Heading>
				Google Maps
			</div>
		);
	}
}

const Heading = styled.h1`
	font-family: 'Mr De Haviland', 'cursive';
	font-size: 60px;
	font-weight: 300;
	margin-top: 24px;
	margin-bottom: 24px;
`;

const Image = styled.div`
	width: 100%;
	height: 500px;
	${(props: { src: string}) => css`
		background-image: url(${props.src});
		background-repeat: no-repeat;
		background-position-y: 22%;
		background-size: cover;
	`};
` as StyledComponentClass<{src: string}, any>;

export default Party;
