import * as React from 'react';
import { Subscription } from 'rxjs';

import { User } from '../../services/firebase';
import { onAuthStateChanged } from '../../services/authentication';


export interface InjectedCurrentUserProps {
	currentUser?: User;
}

export default function addCurrentUser<OriginalProps>() {
	interface State {
		currentUser?: User;
	}

	return (InnerComponent: (React.ComponentClass<OriginalProps & InjectedCurrentUserProps> | React.StatelessComponent<OriginalProps & InjectedCurrentUserProps>)): React.ComponentClass<OriginalProps> => {
		return class CurrentUser extends React.PureComponent<OriginalProps, State> {
			static displayName = `CurrentUser(${InnerComponent.displayName})`;
			private subscription: Subscription;

			constructor(props: OriginalProps & InjectedCurrentUserProps) {
				super(props);
				this.state = {};
			}

			componentDidMount() {
				this.subscription = onAuthStateChanged
					.subscribe(user => this.setState({ currentUser: user }));
			}

			componentWillUnmount() {
				this.subscription && this.subscription.unsubscribe();
			}

			render () {
				return (
					<InnerComponent currentUser={this.state.currentUser} {...this.props}/>
				);
			}

		};
	};
}
