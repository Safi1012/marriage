import * as React from 'react';
import { Box, Input } from 'rebass';
import { Person } from '../Response';

interface State {}
interface Props {
	person: Person;
	onUpdate: (person: Person) => void;
}

class ResponsePerson extends React.Component<Props, State> {

	updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onUpdate({
			...this.props.person,
			name: event.target.value,
		});
	}

	updateAllergie = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onUpdate({
			...this.props.person,
			allergies: event.target.value,
		});
	}

	render() {
		return (
			<Box my={2}>
				<Input placeholder="Name" type="text" value={this.props.person.name} onChange={this.updateName}/>
				<Box ml={5} my={2} >
					<Input placeholder="Unverträglichkeit" type="text" value={this.props.person.allergies} onChange={this.updateAllergie}/>
				</Box>
			</Box>
		);
	}
}

export default ResponsePerson;
