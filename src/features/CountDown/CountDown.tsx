import * as React from 'react';

import Date from '../Date';
import { onAuthStateChanged } from '../../services/authentication';

interface State {}
interface Props {}

class CountDown extends React.Component<Props, State> {

	componentDidMount() {
		onAuthStateChanged.subscribe(() => {
			console.log('COundDOwn');
		});
	}

	render() {
		return <Date />;
	}
}

export default CountDown;
