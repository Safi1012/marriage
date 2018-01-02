import * as React from 'react';
import styled from 'styled-components';

import LeafletStyles from './Leaflet.styles';

interface State {
	number: number;
}
interface Props {
	className?: string;
}

class Leaflet extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			number: 0,
		};
	}

	render() {
		return (
			<div className={this.props.className}>
				<span className="top">6</span>
				<span className="top-back">
					<span>5</span>
				</span>
				<span className="bottom">6</span>
				<span className="bottom-back">
					<span>5</span>
				</span>
			</div>
		);
	}
}

export default styled(Leaflet)`${LeafletStyles}`;

/*
<div class="figure min min-1">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
	  </div>
	  */
