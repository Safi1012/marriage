import * as React from 'react';
import styled from 'styled-components';

import theme from '../theme';


interface Props {
	className?: string;
}

class LoadingSpinner extends React.PureComponent<Props> {
	render() {
		return (
			<CenteredDiv>
				<div className={this.props.className}>
					<div />
				</div>
			</CenteredDiv>
		);
	}
}

const CenteredDiv = styled.div`
	position: absolute;
	width: 64px;
	height: 64px;
	left: 50%;
	bottom: 50%;
	transform: translateX(-50%) translateY(-50%);
`;


export default styled(LoadingSpinner)`
	transform: rotate(45deg);
	transform-origin: 32px 32px;

	& > div {
		background-color: ${theme.colors.primaryColor};
		top: 23px;
		left: 19px;
		position: absolute;
		width: 26px;
		height: 26px;
		animation: lds-heart 1s infinite linear, fade-in 0.4s ease-in-out;
	}
	& > div:after,
	& > div:before {
		content: " ";
		position: absolute;
		display: block;
		width: 26px;
		height: 26px;
		background-color: ${theme.colors.primaryColor};
	}
	& > div:before {
		left: -17px;
		border-radius: 50% 0 0 50%;
	}
	& > div:after {
		top: -17px;
		border-radius: 50% 50% 0 0;
	}

	@keyframes lds-heart {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
