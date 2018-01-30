import * as React from 'react';
import { connect } from 'react-firebase';

import { Button } from 'rebass';
import { App } from '../../services/firebase';
import addCurrentUser, { InjetedCurrentUserProps } from '../hocs/currentUser/currentUser';

interface State {}

interface externalProps {}
interface firebaseInjectedProps {
	score: number;
	setCounterValue: (value: number) => any;
}
interface Props extends externalProps, firebaseInjectedProps, InjetedCurrentUserProps {}

class Counter extends React.Component<Props, State> {

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
	score: `counter/${props.currentUser && props.currentUser.uid}/score`,
	setCounterValue: (value: number) => ref(`counter/${props.currentUser && props.currentUser.uid}/score`).set(value),
});

export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(Counter)
);
