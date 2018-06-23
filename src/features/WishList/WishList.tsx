import * as React from 'react';
import { Heading, Flex, Card, Button, Box } from 'rebass';
import styled from 'styled-components';

interface State {
}

interface ExternalProps {}
interface Props extends ExternalProps {}// , InjetedCurrentUserProps, FirebaseInjectedProps {}

export interface WishProduct {
	title: string;
	description: string;
	link: string;
	pictureUrl?: string;
	reservedBy?: string;
}

class WishList extends React.Component<Props, State> {


	wishListMock: WishProduct[] = [ {
		title: 'Waschmaschine',
		description: 'Bosch WAN28020 Serie 4 A+++/Waschmaschine/1400UpM/VarioPerfect/137 kWh/Jahr/6 kg/weiß [Energieklasse A+++]',
		link: 'https://www.amazon.de/Bosch-WAN28020-Waschmaschine-1400UpM-VarioPerfect/dp/B00LVUQWS2/ref=sr_1_1_sspa?s=appliances&ie=UTF8&qid=1529750846&sr=1-1-spons&keywords=Waschmaschine&psc=1',
		pictureUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Myw6Xv5YL._SL1200_.jpg',
	}, {
		title: 'Handy',
		description: 'Outdoor Handy- CUBOT Kingkong 5,0 Zoll Smartphone ohne Vertrag Android 7.0 3G WCDMA Dual Sim Smartphone, ( 2GB RAM +16GB ROM, 8MP+13MP Dual Kamera,4400mAh Akku,IP 68+ Wasserdichtes Staubdichtes Stoßfestes, GPS)',
		link: 'https://www.amazon.de/CUBOT-Smartphone-Wasserdichtes-Staubdichtes-Sto%C3%9Ffestes/dp/B0793CZXK3/ref=sr_1_1_sspa?s=ce-de&ie=UTF8&qid=1529750936&sr=1-1-spons&keywords=Handy&psc=1',
		pictureUrl: 'https://images-na.ssl-images-amazon.com/images/I/712KDje4grL._SL1000_.jpg',
		reservedBy: 'someDude',
	} ];

	renderProduct = (product: WishProduct) => {
		return (
			<Card key={product.title} m={4} p={3}>
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
										{product.reservedBy ? <Button disabled>Reserviert</Button> : <Button>Reservieren</Button>}
									</Flex>
								</Box>
							</FullHeightFlex>
						</Box>
					</Flex>
			</Card>
		);
	}

	render() {
		return (
			<div>
				<Heading level={2}>Wunschliste</Heading>
				{this.wishListMock.map(this.renderProduct)}
			</div>
		);
	}
}

const FullHeightFlex = Flex.extend`
	height: 100%;
`;

const Image = styled.img`
	width: 100%;
`;


export default WishList;
