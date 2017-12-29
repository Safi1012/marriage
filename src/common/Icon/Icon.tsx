import * as React from 'react';

import { IconName } from './icons';

interface Props {
	className?: string;
	name: IconName;
	alt: string;
}

class Icon extends React.Component<Props, {}> {
	render() {
		return (
			<img className={this.props.className} src={require(`./icons/${this.props.name}.svg`)} alt={this.props.alt} />
		);
	}
}

export default Icon;
