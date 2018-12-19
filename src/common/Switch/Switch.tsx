import * as React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import theme from '../theme';


interface Props {
	options: string[];
	name: string;
	onChange: (selected: string) => void;
	selected?: string;
	className?: string;
}

class Switch extends React.Component<Props, {}> {
	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(event.target.value);
	}

	render() {
		const { options, name, className } = this.props;


		return (
			<BorderedBox p="40px" width={1} className={className}>
				<FlexFullWidth align="stretch">
				{
					options.map((option: string) => (
						<Box width={1} key={option}>
							<Input type="radio" id={`${option}-${name}`} name={this.props.name} value={option} onChange={this.handleChange} checked={this.props.selected === option}/>
							<Label htmlFor={`${option}-${name}`}>{option}</Label>
						</Box>
						)
					)
				}
				</FlexFullWidth>
			</BorderedBox>
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

const BorderedBox = Box.extend`
	display: flex;
	padding: 40px;
	border: 1px solid darkgray;
	border-radius: 5px;
`;

const Input = styled.input`
	position: absolute;
	border-radius: 5px;
	clip: rect(0, 0, 0, 0);
	overflow: hidden;
	color: ${theme.colors.primaryColor};

	&:checked + label {
		background-color: ${theme.colors.primaryColor};
		border-radius: 4px;
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
