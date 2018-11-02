import * as React from 'react';
import styled from 'styled-components';

interface Props {
	className?: string;
	options: string[];
}

class Switch extends React.Component<Props, {}> {
	render() {
		const { options, className } = this.props;
		
		return (
			<Div className={className}>
				{
					options.map((option: string) => (
						<div key={option}>
							<Input type="radio" id={option} name="drone" value={option} />
							<Label htmlFor={option}>{option}</Label>
						</div>
						)
					)
				}
			</Div>
		);
	}
}

const Div = styled.div`
	display: flex;
	justify-content: flex-start;
	padding: 40px;
	border: 1px solid darkgray;
	border-radius: 5px;
`;

const Input = styled.input`
	position: absolute !important;
	clip: rect(0, 0, 0, 0);
	overflow: hidden;

	&:checked + label {
		background-color: #A5DC86;
		-webkit-box-shadow: none;
		box-shadow: none;
	}
`;

const Label = styled.label`
	display: inline-block;
	color: rgba(0, 0, 0, 0.6);
	text-align: center;
	padding: 6px 14px;  
	border: 1px solid darkgray;
	transition: all 0.1s ease-in-out;

	&:hover {
		cursor: pointer;
	}
`;

export default styled(Switch)``;
