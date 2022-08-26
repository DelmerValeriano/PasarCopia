import { buildRequest, DOMAIN } from "./index";
import {
  getLocalUserCountry,
  getLocalUserZone,
} from "../../commons/localstorage";
import { getIdToken } from "../../commons/user";

const getStoreNearby = async (myLatitude, myLongitude) => {
  const country = await getLocalUserCountry();
  const paraments = {
    myLatitude,
    myLongitude,
    country,
  };
  return await fetch(DOMAIN.domain + "getStoreNearby", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => data);
};

const getStoresWithSelectedProducts = async (
  myLatitude,
  myLongitude,
  products,
  typeRequest
) => {
  const country = await getLocalUserCountry();
  const idToken = await getIdToken();
  const zone = await getLocalUserZone();

  const productsId = async () => {
    let cart = { items: [], ids: [] };
    cart.items = products;

    cart.items.forEach((item) => cart.ids.push(item.id));
    return cart.ids;
  };
  const paraments = {
    idToken,
    userLocation: { myLatitude, myLongitude },
    productsId: await productsId(),
    country,
    typeRequest,
    zone: zone?.id,
  };

  return await fetch(
    DOMAIN.domain + "getStoresWithSelectedProducts",
    buildRequest(paraments)
  )
    .then((res) => res.json())
    .then((data) => data);
};

export { getStoreNearby, getStoresWithSelectedProducts };
