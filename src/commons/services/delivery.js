import { getIdToken } from "../../commons/user";
import { getLocalUserCountry, getCartItems } from "../../commons/localstorage";
import { buildRequest, DOMAIN } from "./index";

const moment = require("moment-timezone");
const zone_name = moment.tz.guess();
moment.tz.setDefault(zone_name);

const getProducts = async () => {
  const products = await getCartItems();

  let data = products.map((product) => {
    const { name, priceDetail, description } = product;
    return {
      box_type_id: 1,
      description: `${name}, ${priceDetail} || ${description} `,
    };
  });

  return data;
};

const fareEstimate = async (
  pickupLatLong,
  dropLatLong,
  pickup,
  drop,
  shipper_branch_id
) => {
  const country = await getLocalUserCountry();

  const parameters = {
    country,
    idToken: await getIdToken(),
    provider:
      country === "honduras"
        ? "ocho"
        : country === "el-salvador"
        ? "urbano-now"
        : null,
    pickupLatLong,
    dropLatLong,
    pickup,
    drop,
    shipper_branch_id,
  };

  return await fetch(
    DOMAIN.domain + "getDeliveryEstimate",
    buildRequest(parameters)
  )
    .then((res) => res.json())
    .then((data) => data);
};

const makeDeliveryRequest = async (
  storeSelected,
  orderType,
  userAddress,
  resultEstimates,
  user,
  provider,
  orderNotes,
  transactionId,
  ageValidation
) => {
  const userSplitName = user.name.split(" ");
  const packages = await getProducts();

  const parameters = {
    country: await getLocalUserCountry(),
    idToken: await getIdToken(),
    provider,
    orderType,
    userInfo: {
      customerName: user.name,
      customerLastName: userSplitName[2] ? userSplitName[2] : user.email,
      customerNumber: user.phone,
      address: {
        addressDescription: `${userAddress.addressType} - ${userAddress.fullAddress}`,
        coordinates: userAddress.coordinates,
      },
    },
    resultEstimates,
    store: {
      phone: storeSelected.phone,
      storeDescription: storeSelected.address,
      coordinates: storeSelected.coordinates,
      name: storeSelected.name,
    },
    deviceInfo: {
      deviceTime: moment(new Date()).valueOf(),
    },
    orderNotes,
    transactionId,
    ageValidation,
    products: packages,
  };

  return parameters;
};

const ryteSaturation = async (address, store, user) => {
  const parameters = {
    country: await getLocalUserCountry(),
    idToken: await getIdToken(),
    storeInformation: {
      address: store.address,
      city: store.city,
      coordinates: store.coordinates,
      name: store.name,
    },
    user: {
      ...user,
      coordinates: address.coordinates,
      country: address.country,
    },
  };

  return await fetch(DOMAIN.domain + "saturation", buildRequest(parameters))
    .then((res) => res.json())
    .then((data) => data);
};

export { fareEstimate, makeDeliveryRequest, ryteSaturation };
