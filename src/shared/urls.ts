export interface Route {
	displayName: string;
	url: string;
}

export default {
	home: {
		displayName: 'Home',
		url: '/',
	},
	response: {
		displayName: 'Rückmeldung',
		url: '/response',
	},
	wishList: {
		displayName: 'Geschenkliste',
		url: '/wishList',
	},
	cakeList: {
		displayName: 'Kuchenliste',
		url: '/cakeList',
	},
	impressum: {
		displayName: 'Impressum',
		url: '/impressum',
	},
};
