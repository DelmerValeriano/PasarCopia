import { buildRequest, DOMAIN } from "./index";
import {
  getLocalUserCountry,
  getLocalUserZone,
} from "../../commons/localstorage";
import { limitProductsRequest } from "../../commons/consts/consts";

const getUserZone = async () => {
  const zone = await getLocalUserZone();
  return zone;
};

const actionFavorites = async (idToken, productId, addOrRemoveFavorite) => {
  const country = await getLocalUserCountry();
  const paraments = {
    idToken,
    productId,
    addOrRemoveFavorite,
    country,
  };
  return await fetch(DOMAIN.domain + "actionFavorites", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => data);
};

const getUserFavoritesList = async (idToken) => {
  const zone = await getUserZone();

  const paraments = {
    idToken,
    zone: zone?.id,
  };
  return await fetch(
    DOMAIN.domain + "getUserFavoritesList",
    buildRequest(paraments)
  )
    .then((res) => res.json())
    .then((data) => data);
};

const getIsFavorite = async (idToken, productId) => {
  const country = await getLocalUserCountry();
  const paraments = {
    idToken,
    productId,
    country,
  };

  return await fetch(DOMAIN.domain + "isFavorite", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => data.success);
};

const getOrdersList = async (idToken) => {
  const country = await getLocalUserCountry();
  const paraments = {
    idToken,
    country,
  };
  return await fetch(DOMAIN.domain + "getOrderHistory", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => data);
};

const getSearchProduct = async (search, lastRecord = null) => {
  const country = await getLocalUserCountry();
  const zone = await getUserZone();

  const paraments = {
    search,
    country,
    zone: zone?.id,
    limitProductsRequest,
    lastRecord,
  };
  return await fetch(DOMAIN.domain + "searchProduct", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => data);
};

const getSortProductsByPrice = async (
  idCategory = null,
  order,
  search = null,
  lastRecord = null
) => {
  const country = await getLocalUserCountry();
  const zone = await getUserZone();

  const paraments = {
    idCategory,
    order,
    search,
    country,
    zone: zone?.id,
    limitProductsRequest,
    lastRecord,
  };
  return await fetch(
    DOMAIN.domain + "sortProductsByPrice",
    buildRequest(paraments)
  )
    .then((res) => res.json())
    .then((data) => data);
};

const getProducts = async (idCategory = null, lastRecord = null) => {
  const country = await getLocalUserCountry();
  const zone = await getUserZone();

  const paraments = {
    idCategory: idCategory ? idCategory : null,
    country,
    zone: zone?.id,
    limitProductsRequest,
    lastRecord: lastRecord ? lastRecord : null,
  };
  let res = await fetch(DOMAIN.domain + "getProducts", buildRequest(paraments))
    .then((res) => res.json())
    .then((data) => data);

  return res;
};

export {
  actionFavorites,
  getUserFavoritesList,
  getIsFavorite,
  getOrdersList,
  getSearchProduct,
  getSortProductsByPrice,
  getProducts,
};
