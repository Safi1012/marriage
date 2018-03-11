import styled from 'styled-components';
import * as React from 'react';
import { Box } from 'rebass';

import { PersonWithKey } from '../Response';
import Input from '../../../common/Input/Input';

interface State {}
interface Props {
	person: PersonWithKey;
	onUpdate: (person: PersonWithKey) => void;
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
			<Box my={4}>
				<Box width="300px">
					<BigInput placeholder="Name" type="text" value={this.props.person.name} onChange={this.updateName}/>
				</Box>
				<Box>
					Ich esse ... und habe die folgenden
					<Label id=""> Unverträglichkeiten:
						<Input placeholder="Laktose" type="text" value={this.props.person.allergies} onChange={this.updateAllergie}/>
					</Label>
				</Box>
			</Box>
		);
	}
}

const BigInput = Input.extend`
	font-size: 1.5em;
`;

const Label = styled.label``;

export default ResponsePerson;
