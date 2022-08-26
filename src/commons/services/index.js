import { getIdToken, getUid } from "./../user";
import { preProcessOrder, preProcessTDS } from "../processOrder";
import { emptyCart } from "../localstorage";
import { GenOrderNum } from "../paymentFunctions";
import { parseXmlToJson } from "../paymentFunctions";
import {
  getLocalUserCountry,
  getLocalUserZone,
} from "../../commons/localstorage";
import { API_URL, FAC_PAYMENT, FAC_APPLAND } from "./../consts/credentials";
import { MERCH_ID, MERCH_PWD, ACQUIRED_ID } from "./../consts/credentials";
import { formatDataPayWayOne } from "../helpers/payWayOne";
const DOMAIN = {
  domain: API_URL,
  facAppland: FAC_APPLAND,
  facPayment: FAC_PAYMENT,
};

const buildRequest = (data, type) => {
  return {
    method: "POST",
    headers:
      type === "xml"
        ? {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        : {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
    body: type === "xml" ? data : JSON.stringify(data),
  };
};

const buildRequestWidthHeaders = (data, headers) => {
  return {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
};

//This is a request definition example
const getAllUsers = async (placeId) => {
  const data = {
    idToken: await getIdToken(),
    placeId: placeId,
  };
  return fetch(DOMAIN.domain + "getAllUsersWithoutAuth", buildRequest(data));
};

const makeOrder = async (
  shippingDetails,
  newOrderId,
  parametersMakeDeliveryRequest
) => {
  const country = await getLocalUserCountry();
  const zone = await getLocalUserZone();
  const data = {
    idToken: await getIdToken(),
    order: await preProcessOrder(shippingDetails),
    country,
    zone: zone?.id,
    newOrderId,
    parametersMakeDeliveryRequest,
  };

  const response = await fetch(DOMAIN.domain + "makeOrder", buildRequest(data));
  const responseJson = await response.json();

  if (responseJson.success) {
    await emptyCart();
  }
  return responseJson.success;
};

const makeOrderCard = async (
  shippingDetails,
  setOrderNumber,
  myOrderNumber
) => {
  const ResponseURL = DOMAIN.facAppland + "getTransactionResult";
  const orderNumber = GenOrderNum();
  myOrderNumber.value = orderNumber;
  setOrderNumber({ value: orderNumber });
  let response;
  if (shippingDetails.step2.card.card.cardNumber[0] === "3") {
    //Cristian: condición que hace que se siga el flujo de 3DS
    let xmlAR = await preProcessTDS(
      shippingDetails,
      {
        MERCH_ID,
        MERCH_PWD,
        ACQUIRED_ID,
      },
      orderNumber
    );
    response = await fetch(
      DOMAIN.facPayment + "Authorize",
      buildRequest(xmlAR, "xml")
    )
      .then((response) => response.text())
      .then((xmlString) => {
        return parseXmlToJson(xmlString);
      });
  } else {
    let xml3ds = await preProcessTDS(
      shippingDetails,
      {
        MERCH_ID,
        MERCH_PWD,
        ACQUIRED_ID,
      },
      orderNumber,
      ResponseURL
    );
    response = await fetch(
      DOMAIN.facPayment + "Authorize3DS",
      buildRequest(xml3ds, "xml")
    )
      .then((response) => response.text())
      .then((xmlString) => {
        return xmlString
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&#xD;/g, "");
      });
  }
  return response;
};
const savePhoneToken = async (token) => {
  if (getUid()) {
    let paraments = {
      idToken: await getIdToken(),
      phoneToken: token,
    };
    let response = await fetch(
      DOMAIN.domain + "setPhoneToken",
      buildRequest(paraments)
    );
  }
};

const payWayOneTransaction = async (data) => {
  let responseJson;
  try {
    const formatData = await formatDataPayWayOne(data);

    let paraments = {
      idToken: await getIdToken(),
      ...formatData,
    };

    let response = await fetch(
      DOMAIN.domain + "integrationPayWayOne",
      buildRequest(paraments)
    );

    responseJson = await response.json();
  } catch (error) {
    console.log(error);
  }
  return responseJson;
};

const makePreOrder = async (shippingDetails, newOrderId) => {
  const country = await getLocalUserCountry();
  const zone = await getLocalUserZone();
  const data = {
    idToken: await getIdToken(),
    order: await preProcessOrder(shippingDetails),
    country,
    zone: zone?.id,
    newOrderId,
  };

  const response = await fetch(DOMAIN.domain + "preOrders", buildRequest(data));
  const responseJson = await response.json();

  return responseJson;
};

const setOrders = async (
  paymentDetailFac,
  preOrderId,
  parametersMakeDeliveryRequest
) => {
  const {
    numeroAutorizacion,
    numeroPayWay,
    terminacionTarjeta,
    numeroReferencia,
  } = paymentDetailFac;
  const country = await getLocalUserCountry();
  const zone = await getLocalUserZone();
  const data = {
    idToken: await getIdToken(),
    paymentDetailFac: {
      AuthCode: numeroAutorizacion,
      OrderID: numeroPayWay,
      PaddedCardNo: terminacionTarjeta,
      ReferenceNo: numeroReferencia,
    },
    preOrderId,
    country,
    zone: zone?.id,
    parametersMakeDeliveryRequest,
  };

  const response = await fetch(DOMAIN.domain + "setOrders", buildRequest(data));
  const responseJson = await response.json();
  if (responseJson.success) {
    await emptyCart();
  }
  return responseJson;
};

const deletePreOrders = async (preOrderId, pointsAssigned) => {
  const country = await getLocalUserCountry();

  const data = {
    idToken: await getIdToken(),
    preOrderId,
    country,
    pointsAssigned,
  };

  const response = await fetch(
    DOMAIN.domain + "deletePreOrders",
    buildRequest(data)
  );
  const responseJson = await response.json();

  return responseJson;
};

const getCountriesZonesActive = async (country) => {
  let paraments = {
    country,
  };
  let response = await fetch(
    DOMAIN.domain + "countriesActiveZones",
    buildRequest(paraments)
  );
  return await response.json();
};

export {
  getAllUsers,
  getCountriesZonesActive,
  buildRequest,
  buildRequestWidthHeaders,
  DOMAIN,
  makeOrder,
  makeOrderCard,
  savePhoneToken,
  payWayOneTransaction,
  makePreOrder,
  setOrders,
  deletePreOrders,
};
