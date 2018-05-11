import styled from 'styled-components';
import * as React from 'react';
import { Box, Button, Flex } from 'rebass';

import { PersonWithKey } from '../Response';
import Input from '../../../common/Input/Input';

interface State {}
interface Props {
	person: PersonWithKey;
	onUpdate: (person: PersonWithKey) => void;
	delete: (person: PersonWithKey) => void;
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

	delete = () => {
		this.props.delete(this.props.person);
	}

	render() {
		return (
			<Box my={4}>
				<Flex justify="space-between" wrap>
					<Box width="300px">
						<BigInput placeholder="Name" type="text" value={this.props.person.name} onChange={this.updateName}/>
					</Box>
					<RemoveButton onClick={this.delete}>
						X
					</RemoveButton>
				</Flex>
				<Box>
					Ich esse ... und habe die folgenden
					<Label id="">
						 Unverträglichkeiten: <InputMax placeholder="Laktose" type="text" value={this.props.person.allergies} onChange={this.updateAllergie}/>
					</Label>
				</Box>
			</Box>
		);
	}
}

const RemoveButton = Button.extend`
	background-color: orange;
`;

const BigInput = Input.extend`
	font-size: 1.5em;
`;

const InputMax = Input.extend`
	max-width: 500px;
`;

const Label = styled.label``;

export default ResponsePerson;
