import * as React from 'react';
import { Heading, Flex, Card, Button, Box } from 'rebass';
import styled from 'styled-components';
import { connect } from 'react-firebase';

import { App } from '../../services/firebase';
import addCurrentUser, { InjetedCurrentUserProps } from '../../hocs/addCurrentUser';
import theme from '../../common/theme';


interface State {
}

interface ExternalProps {}
interface FirebaseInjectedProps {
	cakes: {[key: string]: Cake};
	changeCake: (cake: Cake, key: string) => any;
}
interface Props extends ExternalProps, FirebaseInjectedProps, InjetedCurrentUserProps {}

export interface Cake {
	title: string;
	bakedBy?: string;
}
export interface CakeWithKey extends Cake {
	key: string;
}

class CakeList extends React.Component<Props, State> {

	objectToArray(object: {[key: string]: Cake}): CakeWithKey[] {
		if (object) {
			return Object.entries(object)
				.map(([ key, innerObject ]) => ({ ...innerObject, key }));
		}
		return [];
	}

	changeCake = (wishProduct: CakeWithKey) => {
		const { key, bakedBy, ...changedCake } = wishProduct;
		this.props.changeCake({ ...changedCake, bakedBy: this.props.currentUser && this.props.currentUser.uid }, key);
	}

	/*renderReserveButton = (product: WishProductWithKey) => {
		if (this.props.currentUser) {
			if (product.reservedBy && product.reservedBy === this.props.currentUser.uid) {
				return <Button onClick={this.unreserveProduct.bind(this, product)}>Reserviert rückgängig machen</Button>;
			}
			if (product.reservedBy && product.reservedBy !== this.props.currentUser.uid) {
				return <Button disabled>Reserviert</Button>;
			}
		}
		if (!product.reservedBy) {
			return <Button onClick={this.reserveProduct.bind(this, product)}>Reservieren</Button>;
		}
		return <Button disabled>Reserviert</Button>;

	}*/

	renderCake = (cake: CakeWithKey) => {
		return (
			<tr key={cake.key}>
				<td>{cake.title}</td>
				<td>{cake.bakedBy}</td>
			</tr>
		);
	}

	render() {
		return (
			<div>
				<Heading level={2}>Kuchenübersicht</Heading>
				<table>
					<th>
						<td>Was?</td>
						<td>Wer?</td>
					</th>
					{this.objectToArray(this.props.cakes).map(this.renderCake)}
				</table>
			</div>
		);
	}
}
/*
const Banner = Box.extend`
	background-color: ${theme.colors.primaryColor};
	color: #FFF;
	text-align: center;
`;
*/
const mapFirebaseToProps = (props: Props, ref: any, firebase: App) => ({
	casks: `cakes`,
	addCake: (cake: Cake) => ref(`cakes/`).push(cake),
	updateCake: (cake: Cake, key: string) => ref(`cakes/${key}`).set(cake),
});

export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(CakeList)
);
