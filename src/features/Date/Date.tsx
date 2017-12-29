import * as React from 'react';
import { connect } from 'react-firebase';

interface State {}
interface Props {
	date?: string;
}

class Date extends React.Component<Props, State> {

	render() {
		return <span>{this.props.date}</span>;
	}
}

export {
	Date,
};

const mapFirebaseToProps = (props: Props) => ({
	date: 'date',
});
export default connect(
	mapFirebaseToProps
)(Date);

