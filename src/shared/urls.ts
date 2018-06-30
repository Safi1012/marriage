export interface Route {
	displayName: string;
	url: string;
}

export default {
	home: {
		displayName: 'Home',
		url: '/',
	},
	countDown: {
		displayName: 'Countdown',
		url: '/countDown',
	},
	response: {
		displayName: 'Rückmeldung',
		url: '/response',
	},
	wishList: {
		displayName: 'Geschenkliste',
		url: '/wishList',
	},
};
