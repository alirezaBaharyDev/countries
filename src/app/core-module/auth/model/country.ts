import {CountryCurrency} from "./country-currency";
import {CountryLanguage} from "./country-language";

export interface Country {
  name: string,
  capital: string,
  region: string,
  subregion: string,
  population: number,
  latlng: number [],
  area: number,
  gini: number,
  timezones: string []
  nativeName: string,
  numericCode: number,
  currencies: CountryCurrency [],
  languages: CountryLanguage [],
  flag: string
}
