import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

import buttonStyles from './Button.style';

interface ButtonProps {
	brand: 'default';
	className?: string;
	onClick?(): void;
	disabled?: boolean;
	ariaLabel?: string;
}

class Button extends React.PureComponent<ButtonProps, {}> {
	render() {
		return (
			<button
				className={this.props.className}
				aria-label={this.props.ariaLabel}
				disabled={this.props.disabled}
			>
				{this.props.children}
			</button>
		);
	}

}

export { StyledComponentClass };
export default styled(Button)`${buttonStyles}`;
