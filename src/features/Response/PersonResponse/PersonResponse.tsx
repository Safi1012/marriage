import * as React from 'react';
import { Card, Flex } from 'rebass';

import { PersonWithKey, Food, Participate } from '../Response';
import Input from '../../../common/Input';
import Switch from '../../../common/Switch';

interface State {}

interface Props {
	person: PersonWithKey;
	onUpdate: (person: PersonWithKey) => void;
}

class ResponsePerson extends React.Component<Props, State> {

	updateAllergie = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onUpdate({
			...this.props.person,
			allergies: event.target.value,
		});
	}

	handleParticipation = (newValue: Participate) => {
		this.props.onUpdate({
			...this.props.person,
			participate: newValue,
		});
	}

	handleFood = (newValue: Food) => {
		this.props.onUpdate({
			...this.props.person,
			food: newValue,
		});
	}

	render() {
		return (
			<Card>
				<div>
					<FlexFullWidth justify="center">
						<h2>{this.props.person.name}</h2>
					</FlexFullWidth>

					<FlexFullWidth>
						<p>Ich nehme Teil?</p>
						<Switch name="participate" options={[ Participate.Yes, Participate.No ]} selected={this.props.person.participate} onChange={this.handleParticipation}/>
					</FlexFullWidth>

					<FlexFullWidth>
						<p>Du isst?</p>
						<Switch name="food" options={[ Food.Meet, Food.Vegetary, Food.Vegan, Food.Nothing ]} selected={this.props.person.food} onChange={this.handleFood}/>
					</FlexFullWidth>

					<FlexFullWidth>
						<p>Hast du Essensallergien?</p>
						<Input placeholder="z.B. Laktose" type="text" value={this.props.person.allergies} onChange={this.updateAllergie}/>
					</FlexFullWidth>
				</div>
			</Card>
		);
	}
}

const FlexFullWidth = Flex.extend`
	width: 100%;
`;

export default ResponsePerson;
