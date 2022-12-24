// Code generated by wunderctl. DO NOT EDIT.

export interface CountriesInput {
	filter?: countries_CountryFilterInput;
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

export interface InternalCountriesInput {
	filter?: countries_CountryFilterInput;
}

export interface InjectedCountriesInput {
	filter?: countries_CountryFilterInput;
}

export interface CountriesResponse {
	data?: CountriesResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface CountriesResponseData {
	countries_countries: {
		code: string;
		name: string;
		capital?: string;
	}[];
}
