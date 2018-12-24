import * as React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import theme from '../theme';


interface Props {
	name: string;
	onChange: (selected: string) => void;
	options: string[];
	selected?: string;
	className?: string;
}

class Switch extends React.Component<Props, {}> {


	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(event.target.value);
	}

	render() {
		const { options, className } = this.props;

		return (
			<FlexFullWidth align="stretch" className={className}>
			{
				options.map((option: string) => (
					<Box width={1} key={option}>
						<Input type="radio" id={`${this.props.name}-${option}`} name={this.props.name} value={option} onChange={this.handleChange} checked={this.props.selected === option}/>
						<Label htmlFor={`${this.props.name}-${option}`}>{option}</Label>
					</Box>
					)
				)
			}
			</FlexFullWidth>
		);
	}
}

const FlexFullWidth = Flex.extend`
	width: 100%;
	& > div:first-child > Label {
		border-radius: 4px 0 0 4px;
	}
	& > div:last-child > Label {
		border-radius: 0 4px 4px 0;
	}
`;

const Input = styled.input`
	position: absolute;
	border-radius: 5px;
	clip: rect(0, 0, 0, 0);
	overflow: hidden;
	color: ${theme.colors.primaryColor};

	&:checked + label {
		background-color: ${theme.colors.primaryColor};
		color: white;
		-webkit-box-shadow: none;
		box-shadow: none;
	}
`;

const Label = styled.label`
	display: inline-block;
	width: 100%;
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
