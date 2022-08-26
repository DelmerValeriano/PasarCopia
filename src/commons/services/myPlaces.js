import { buildRequest, DOMAIN } from "./index";
import { getLocalUserCountry } from "../../commons/localstorage";

const moment = require("moment-timezone");
const zone_name = moment.tz.guess();
moment.tz.setDefault(zone_name);

const getAllMyPlaces = async (idToken) => {
  const paraments = {
    idToken,
  };
  let items = [];
  await fetch(DOMAIN.domain + "getAllMyPlaces", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => (items = data));
  return items;
};

const insertMyPlace = async (idToken, items) => {
  const today = moment(new Date()).valueOf();

  const country = await getLocalUserCountry();
  const paraments = {
    idToken: idToken,
    addressType: items.addressType,
    country,
    date: {
      fullDate: moment(today).format("MMMM Do YYYY, h:mm:ss a"),
      milliseconds: today,
    },
    fullAddress: items.fullAddrress,
    coordinates: items.coordinates,
  };
  let response = await fetch(
    DOMAIN.domain + "setMyPlaces",
    buildRequest(paraments)
  );
  return await response.json();
};
const deleteMyPlace = async (idToken, idsPlace) => {
  const paraments = {
    idToken: idToken,
    placeId: idsPlace.idPlace,
  };
  let response = await fetch(
    DOMAIN.domain + "deleteMyPlaces",
    buildRequest(paraments)
  );
  return await response.json();
};

export { getAllMyPlaces, insertMyPlace, deleteMyPlace };
