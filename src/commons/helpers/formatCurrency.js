import { COUNTRIES } from "../consts/country";
import {
  getLocalUserCountry,
  getLocalUserZone,
} from "../../commons/localstorage";

let country;

export const getUserCountry = async () => {
  country = await getLocalUserCountry();
};

getUserCountry();

let zone;

export const getUserZone = async () => {
  zone = await getLocalUserZone();
};

getUserZone();

export const formatCurrency = (value = 0) => {
  const currencyValue = COUNTRIES[country].currency.smallFormat;
  const valueFormat = `${currencyValue} ${value
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

  return valueFormat;
};
