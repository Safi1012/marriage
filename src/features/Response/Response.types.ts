
export enum Participate {
	Yes = 'Ja',
	No = 'Nein',
}

export enum Food {
	Meet = 'Fleisch',
	Vegetarian = 'Vegetarisch',
	Vegan = 'Vegan',
	Nothing = 'Nichts',
}

export interface PersonServerResponse {
	name: string;
	participate: Participate;
	food: Food;
	allergies: string;
}

export interface Person extends PersonServerResponse {
	key: string;
}

export const adjustPersonFromServer = (persons: {[key: string]: PersonServerResponse}) => {
	if (persons) {
		return Object.entries(persons)
			.map(([ key, person ]: [string, PersonServerResponse]) => ({ ...person, key }));
	}
	return [];
};

export interface ResponseServerResponse {
	persons: { [key: string]: PersonServerResponse };
	email: string;
	song: string;
	responded: boolean;
	internalName: string;
}
