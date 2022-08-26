import { getCartItems } from "./localstorage";
import { getPersonalInfo, getIsAnonymous } from "./user";
import {
  GetCardDetails,
  GetBillingDetails,
  GetShippingDetails,
  GetTransactionDetails,
  ThreeDS,
  TransactionRequest,
} from "./paymentFunctions";

const moment = require("moment-timezone");
import "moment/locale/es";
const zone_name = moment.tz.guess();
moment.tz.setDefault(zone_name);

const getProducts = async () => {
  return await getCartItems();
};

const preProcessOrder = async (shippingDetails) => {
  const today = moment(new Date()).valueOf();
  const personalInfo = getPersonalInfo();
  const products = await getProducts();
  const shippingCost = shippingDetails.shippingCost;
  const subtotal = getSubtotal(products);
  const pointsCash = shippingDetails.step2.points.active
    ? shippingDetails.step2.points.needReturned.money
    : 0;
  const subTotal = subtotal + shippingCost;
  let totalApplyingDiscount =
    shippingDetails.step2.codePromotional?.code.type === "amount"
      ? subTotal - shippingDetails.step2.codePromotional?.code.discount
      : shippingDetails.step2.codePromotional?.code.type === "percentage"
      ? subTotal -
        (subTotal * shippingDetails.step2.codePromotional?.code.discount) / 100
      : shippingDetails.step2.codePromotional?.code.type === "free shipping"
      ? subTotal - shippingCost
      : shippingDetails.step2.codePromotional?.code.type === "shipping Amount"
      ? subTotal -
        shippingCost +
        shippingDetails.step2.codePromotional?.code.discount
      : shippingDetails.step2.codePromotional?.code.type ===
        "percentage in shipping"
      ? subTotal -
        (shippingCost * shippingDetails.step2.codePromotional?.code.discount) /
          100
      : null;

  const TotalneedReturned = totalApplyingDiscount
    ? totalApplyingDiscount
    : subtotal + shippingCost;

  let shippingFormat = {
    buyer: {
      email: shippingDetails.step1.shippingOwner.email,
      fullName: getIsAnonymous()
        ? `${personalInfo.fullName}-${shippingDetails.step1.shippingOwner.email}`
        : personalInfo.fullName,
      phone: shippingDetails.step1.shippingOwner.phone,
      rtn: shippingDetails.step1.shippingOwner.rtn,
      nameRtn: shippingDetails.step1.shippingOwner.nameRtn,
    },
    date: {
      fullDate: moment(today).format("MMMM Do YYYY, h:mm:ss a"),
      milliseconds: today,
    },
    paymentDetailFac: shippingDetails.transaction.OrderID
      ? {
          ...shippingDetails.transaction,
        }
      : null,
    shipping: {
      state: shippingDetails.step1?.shippingPlace?.placeLevel1?.name,
      city: shippingDetails.step1?.shippingPlace?.placeLevel2?.name,
      suburb: shippingDetails.step1?.shippingPlace?.placeLevel3?.name,
      fullAddress: shippingDetails.step1?.shippingPlace?.fullAddrress,
      shippingCost,
      paymentMethod: {
        cash: shippingDetails.step2.cash.active
          ? {
              needReturned: {
                bool: shippingDetails.step2.cash.needReturned.bool,
                value: shippingDetails.step2.cash.needReturned.bool
                  ? shippingDetails.step2.cash.needReturned.value
                  : 0,
                return: shippingDetails.step2.cash.needReturned.bool
                  ? parseFloat(
                      (
                        Math.round(
                          (shippingDetails.step2.cash.needReturned.value -
                            (TotalneedReturned - pointsCash)) *
                            100
                        ) / 100
                      ).toFixed(2)
                    )
                  : 0,
              },
            }
          : null,
        card: shippingDetails.step2.card.active
          ? `xxxx xxxx xxxx ${shippingDetails.step2.card.card.cardNumber.substring(
              12,
              16
            )}`
          : null,
        points: shippingDetails.step2.points.active
          ? shippingDetails.step2.points.needReturned
          : null,
        codePromotional: shippingDetails.step2.codePromotional
          ? shippingDetails.step2.codePromotional
          : null,
      },
    },
    orderHistory: products,
    shippingCost: shippingDetails.shippingCost,
    subtotal,
    status: "pendiente",
    statusHistory: [
      {
        date: {
          fullDate: moment(today).format("MMMM Do YYYY, h:mm:ss a"),
          milliseconds: today,
        },
        status: "pendiente",
      },
    ],
    total: subTotal,
    totalApplyingDiscount,

    orderId: shippingDetails.transaction.OrderID,
    orderType: shippingDetails.orderType,
    storeId: shippingDetails.storeId,
    storeName: shippingDetails.storeName,
    storePhone: shippingDetails.storePhone,
    deliveryOrder: shippingDetails.deliveryOrder,
    orderNotes: shippingDetails.step1.orderNotes,
    timeOfArrival: shippingDetails.step1.timeOfArrival,
  };
  return shippingFormat;
};

const preProcessTDS = async (
  shippingDetails,
  MerchantInfo,
  orderNumber,
  ResponseURL
) => {
  let format;
  const products = await getProducts();
  const cashPoints = shippingDetails.step2.points.active
    ? shippingDetails.step2.points.needReturned.money
    : 0;
  const shippingCost = shippingDetails.shippingCost;

  let amountTotal = getSubtotal(products) + shippingCost - cashPoints;

  let totalApplyingDiscount =
    shippingDetails.step2.codePromotional?.code.type === "amount"
      ? amountTotal - shippingDetails.step2.codePromotional?.code.discount
      : shippingDetails.step2.codePromotional?.code.type === "percentage"
      ? amountTotal -
        (amountTotal * shippingDetails.step2.codePromotional?.code.discount) /
          100
      : shippingDetails.step2.codePromotional?.code.type === "free shipping"
      ? amountTotal - shippingCost
      : shippingDetails.step2.codePromotional?.code.type === "shipping Amount"
      ? amountTotal -
        shippingCost +
        shippingDetails.step2.codePromotional?.code.discount
      : shippingDetails.step2.codePromotional?.code.type ===
        "percentage in shipping"
      ? amountTotal -
        (shippingCost * shippingDetails.step2.codePromotional?.code.discount) /
          100
      : amountTotal;

  let amount = totalApplyingDiscount;
  let currency = "340";
  let request = {
    CardDetails: GetCardDetails(shippingDetails),
    TransactionDetails: await GetTransactionDetails(
      MerchantInfo.MERCH_ID,
      MerchantInfo.MERCH_PWD,
      MerchantInfo.ACQUIRED_ID,
      orderNumber,
      amount,
      currency
    ),
    ShippingDetails: GetShippingDetails(shippingDetails),
    BillingDetails: GetBillingDetails(shippingDetails),
    RecurringDetails: null,
    FraudDetails: null,
    ThreeDSecureDetails: null,
  };
  if (shippingDetails.step2.card.card.cardNumber[0] === "3") {
    //Cristian: condición que hace que se siga el flujo de 3DS
    format = TransactionRequest(request);
  } else {
    format = ThreeDS(request, ResponseURL);
  }
  return format;
};

const getSubtotal = (products) => {
  let subtotal = 0;
  products.forEach((item) => {
    subtotal = subtotal + item.price * item.quantity;
  });
  return parseFloat((Math.round(subtotal * 100) / 100).toFixed(2));
};

export { preProcessOrder, getSubtotal, preProcessTDS };
