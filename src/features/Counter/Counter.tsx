import * as React from 'react';
import { connect } from 'react-firebase';

import { Button } from 'rebass';
import { App } from '../../services/firebase';

interface State {}

interface externalProps {}
interface firebaseInjectedProps {
	score: number;
	setCounterValue: (value: number) => any;
}
interface Props extends externalProps, firebaseInjectedProps {}

class Counter extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
		};
	}

	increaseMyScore = () => {
		this.props.setCounterValue(this.props.score + 1);
	}

	decreaseMyScore = () => {
		this.props.setCounterValue(this.props.score - 1);
	}

	render() {
		return (
			<div>
				<div>
					<Button onClick={this.increaseMyScore}>+</Button>
					<Button onClick={this.decreaseMyScore}>-</Button>

					<div>
						{this.props.score}
					</div>
				</div>
			</div>
		);
	}
}

const mapFirebaseToProps = (props: Props, ref: any, firebase: App) => ({
	score: `counter/${firebase.auth().currentUser && firebase.auth().currentUser!.uid}/score`,
	setCounterValue: (value: number) => ref(`counter/${firebase.auth().currentUser && firebase.auth().currentUser!.uid}/score`).set(value),
});

export default connect(
	mapFirebaseToProps
)(Counter);
