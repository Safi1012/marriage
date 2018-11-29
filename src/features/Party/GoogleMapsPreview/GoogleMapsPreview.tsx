import * as React from 'react';
import styled from 'styled-components';


export interface Props {
	className?: string;
	src: string;
}

class GoogleMapsPreview extends React.Component<Props> {
	render() {
		return (
			<Iframe src={this.props.src} />
		);
	}
}

const Iframe = styled.iframe`
	width: 100%;
	height: 450px;
	border: none;
`;

export default GoogleMapsPreview;
