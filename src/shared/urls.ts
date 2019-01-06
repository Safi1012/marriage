import { compile } from 'path-to-regexp';

export interface Route {
	displayName: string;
	url: string;
}

export default {
	home: {
		displayName: 'Home',
		url: '/home',
	},
	party: {
		displayName: 'Party',
		url: '/party',
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
	login: {
		displayName: 'Einloggen',
		rawUrl: '/login/:loginCode?',
		url: compile('/login/:loginCode?'),
	},
};
