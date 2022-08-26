import { getCartItems } from "../localstorage";

const getProducts = async () => {
  return await getCartItems();
};

const getSubtotal = (products) => {
  let subtotal = 0;
  products.forEach((item) => {
    subtotal = subtotal + item.price * item.quantity;
  });
  return parseFloat((Math.round(subtotal * 100) / 100).toFixed(2));
};

const formatAmount = (amount, decimals = 0) => {
  amount += ""; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto
  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);
  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = "" + amount.toFixed(decimals);
  let amount_parts = amount.split("."),
    regexp = /(\d+)(\d{3})/;
  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

  return amount_parts.join(".");
};

const formatDataPayWayOne = async (shippingDetails) => {
  const { step2, shippingCost, step1 } = shippingDetails;
  const { points, codePromotional, card: dataCard } = step2;
  const { shippingOwner } = step1;
  const { card } = dataCard;

  const products = await getProducts();
  const cashPoints = points.active ? points.needReturned.money : 0;

  let amountTotal = getSubtotal(products) + shippingCost - cashPoints;

  let totalApplyingDiscount =
    codePromotional?.code.type === "amount"
      ? amountTotal - codePromotional?.code.discount
      : codePromotional?.code.type === "percentage"
      ? amountTotal - (amountTotal * codePromotional?.code.discount) / 100
      : codePromotional?.code.type === "free shipping"
      ? amountTotal - shippingCost
      : codePromotional?.code.type === "shipping Amount"
      ? amountTotal - shippingCost + codePromotional?.code.discount
      : codePromotional?.code.type === "percentage in shipping"
      ? amountTotal - (shippingCost * codePromotional?.code.discount) / 100
      : amountTotal;

  let amount = formatAmount(totalApplyingDiscount, 2);

  const data = {
    userCustomer: shippingOwner.name,
    expirationDate: card?.cardDate,
    amount,
    CardholderName: card?.cardName,
    cardNumber: card?.cardNumber,
    cvv2: card?.cardCVC,
  };

  return data;
};

export { formatDataPayWayOne };
