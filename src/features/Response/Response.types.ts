
export enum Participate {
	Yes = 'Ja',
	No = 'Nein',
}

export enum Food {
	Meet = 'Fleisch',
	Vegetary = 'Vegetarisch',
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
	mailUpdate: string;
	responded: boolean;
	internalName: string;
}
