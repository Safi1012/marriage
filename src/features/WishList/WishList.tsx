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
	wishProducts: {[key: string]: WishProduct};
	reserveProduct: (wishProduct: WishProduct, key: string) => any;
}
interface Props extends ExternalProps, FirebaseInjectedProps, InjetedCurrentUserProps {}

export interface WishProduct {
	title: string;
	description: string;
	link: string;
	pictureUrl?: string;
	reservedBy?: string;
}
export interface WishProductWithKey extends WishProduct {
	key: string;
}

class WishList extends React.Component<Props, State> {

	objectToArray(object: {[key: string]: WishProduct}): WishProductWithKey[] {
		if (object) {
			return Object.entries(object)
				.map(([ key, innerObject ]) => ({ ...innerObject, key }));
		}
		return [];
	}

	reserveProduct = (wishProduct: WishProductWithKey) => {
		const { key, reservedBy, ...newWishProduct } = wishProduct;
		this.props.reserveProduct({ ...newWishProduct, reservedBy: this.props.currentUser && this.props.currentUser.uid }, key);
	}

	unreserveProduct = (wishProduct: WishProductWithKey) => {
		const { key, reservedBy, ...newWishProduct } = wishProduct;
		this.props.reserveProduct(newWishProduct, key);
	}

	renderReserveButton = (product: WishProductWithKey) => {
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

	}

	renderProduct = (product: WishProductWithKey) => {
		return (
			<Card key={product.key} m={4} p={3}>
					<Flex justify="flex-start" wrap>
						<Box width={[ 1, 1, 0.3 ]} mb={[ 3, 3, 0 ]}>
							<Flex align="center">
								<Image src={product.pictureUrl} />
							</Flex>
						</Box>
						<Box width={[ 1, 1, 0.7 ]}>
							<FullHeightFlex column justify="space-between">
								<Box>
									<a href={product.link}>
										<Heading level={3}>{product.title}</Heading>
									</a>
									<p>{product.description}</p>
								</Box>
								<Box>
									<Flex justify="flex-end">
										{this.renderReserveButton(product)}
									</Flex>
								</Box>
							</FullHeightFlex>
						</Box>
						{
						this.props.currentUser && this.props.currentUser.uid === product.reservedBy &&
							<Banner width={[ 1 ]} mt={3} p={3}>
								Dein Produkt
							</Banner>
						}
					</Flex>
			</Card>
		);
	}

	render() {
		return (
			<div>
				<Heading level={2}>Wunschliste</Heading>
				{this.objectToArray(this.props.wishProducts).map(this.renderProduct)}
			</div>
		);
	}
}

const Banner = Box.extend`
	background-color: ${theme.colors.primaryColor};
	color: #FFF;
	text-align: center;
`;

const FullHeightFlex = Flex.extend`
	height: 100%;
`;

const Image = styled.img`
	width: 100%;
`;

const mapFirebaseToProps = (props: Props, ref: any, firebase: App) => ({
	wishProducts: `wishlist`,
	reserveProduct: (wishProduct: WishProduct, key: string) => ref(`wishlist/${key}`).set(wishProduct),
});

export default addCurrentUser()(
	connect(
		mapFirebaseToProps
	)(WishList)
);
