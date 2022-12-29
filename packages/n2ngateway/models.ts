// Code generated by wunderctl. DO NOT EDIT.

export interface ContinentsInput {
	filter?: world_ContinentFilterInput;
}

export interface CountriesInput {
	filter?: countries_CountryFilterInput;
}

export interface world_ContinentFilterInput {
	code?: world_StringQueryOperatorInput;
}

export interface world_StringQueryOperatorInput {
	eq?: string;
	glob?: string;
	in?: string[];
	ne?: string;
	nin?: string[];
	regex?: string;
}

export interface countries_CountryFilterInput {
	code?: countries_StringQueryOperatorInput;
	continent?: countries_StringQueryOperatorInput;
	currency?: countries_StringQueryOperatorInput;
}

export interface countries_StringQueryOperatorInput {
	eq?: string;
	glob?: string;
	in?: string[];
	ne?: string;
	nin?: string[];
	regex?: string;
}

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface GraphQLError {
	message: string;
	path?: ReadonlyArray<string | number>;
}

export interface InternalContinentsInput {
	filter?: world_ContinentFilterInput;
}

export interface InternalCountriesInput {
	filter?: countries_CountryFilterInput;
}

export interface InjectedContinentsInput {
	filter?: world_ContinentFilterInput;
}

export interface InjectedCountriesInput {
	filter?: countries_CountryFilterInput;
}

export interface AllStoresResponse {
	data?: AllStoresResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface ContinentsResponse {
	data?: ContinentsResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface CountriesResponse {
	data?: CountriesResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface AllStoresResponseData {
	allStores: {
		data: {
			_id: string;
		}[];
	};
}

export interface ContinentsResponseData {
	world_continents: {
		code: string;
		name: string;
	}[];
}

export interface CountriesResponseData {
	countries_countries: {
		code: string;
		name: string;
		capital?: string;
	}[];
}
