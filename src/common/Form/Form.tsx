import * as React from 'react';

export interface Props {
	children?: JSX.Element[] | JSX.Element | string;
	onSubmit?: (e: any) => void;
}
export interface State {}

export class Form extends React.Component<Props, State> {
	render() {
		return (
			<form onSubmit={this.props.onSubmit}>
				{this.props.children}
			</form>
		);
	}
}

export default Form;
