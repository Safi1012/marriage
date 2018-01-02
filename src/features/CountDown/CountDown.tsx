import * as React from 'react';

import Date from '../Date';
import Leaflet from './Leaflet';

interface State {}
interface Props {}

class CountDown extends React.Component<Props, State> {

	render() {
		return (
			<div>
				<Date />
				<Leaflet/>
			</div>);
	}
}

export default CountDown;
