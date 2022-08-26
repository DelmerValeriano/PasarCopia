// Expresiones regulaees
const expCardDate = /^\d{4}(?:[-\s]\d{4})?$/;
const expCardDatePayWayOne = /^\d{6}(?:[-\s]\d{6})?$/;
const expCardCVC4 = /^\d{4}(?:[-\s]\d{4})?$/;
const expCardCVC3 = /^\d{3}(?:[-\s]\d{3})?$/;
const expCardNumber = /^\d{16}(?:[-\s]\d{4})?$/;

const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
const amexpRegEx = /^(?:3[47][0-9]{13})$/;

const limitProductsRequest = 12; // Cristian: Por la poca cantidad de productos en la BD, se dejó en esta cantidad.
const limitProductsSuggestedRequest = 9; // Cristian: se suma una unidad más de la solicitada porque siempre se eliminará un producto, el cual es el mismo desde el cual se hizo el llamdo.
const limitStoresRequest = 10; //
const optionsActionSheet = [
  "Ordenar de menor a mayor",
  "Ordenar de mayor a menor",
  "Cancelar",
];

const optionsSelectMyplace = () => [
  { label: "Casa", value: "Casa", key: "Casa" },
  { label: "Trabajo", value: "Trabajo", key: "Trabajo" },
  { label: "Apartamento", value: "Apartamento", key: "Apartamento" },
  { label: "Otro", value: "Otro", key: "Otro" },
];

const optionsTimeOfArrival = () => [
  { label: "5 minutos", value: "5 minutos", key: "5 minutos" },
  { label: "10 minutos", value: "10 minutos", key: "10 minutos" },
  { label: "15 minutos", value: "15 minutos", key: "15 minutos" },
  { label: "20 minutos", value: "20 minutos", key: "20 minutos" },
  { label: "25 minutos", value: "25 minutos", key: "25 minutos" },
  { label: "30 minutos", value: "30 minutos", key: "30 minutos" },
];

const categoriesDefault = {
  name: "Todos los productos",
  position: 1,
  color: "#FFFFFF",
  invisible: true,
  icon:
    "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",
};
const ordersHistoryItems = [
  {
    address: {
      state: "Francisco Morazán",
      city: "Talanga",
      colonie: "Las Brisas",
    },
    id: "AJFR23784712FR",
    total: 250.0,
    quantityOfProducts: 5,
    date: "Lunes 22 enero del 2020, 12:30 AM",
  },
  {
    address: {
      state: "Francisco Morazán",
      city: "Talanga",
      colonie: "Las Brisas",
    },
    id: "AJQ2647712FR",
    total: 250.0,
    quantityOfProducts: 5,
    date: "Lunes 25 enero del 2010, 12:30 AM",
  },
];

const initCap = (text) => {
  const textInitCap = text.replace(/\b\w/g, (l) => l.toUpperCase());

  return textInitCap;
};

const uppercaseText = (text) => {
  const textUppercase = text.toUpperCase();

  return textUppercase;
};

const validateEmail = (email) => {
  const validate = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
    email
  );
  return validate;
};

const zeroFill = (cardMonth, cardYear) => {
  let width = 4;
  const date = `${cardMonth}${cardYear}`;
  const dateCard = parseInt(date);

  width -= dateCard.toString().length;
  if (width > 0) {
    return (
      new Array(width + (/\./.test(dateCard) ? 2 : 1)).join("0") + dateCard
    );
  }
  return dateCard + ""; // siempre devuelve tipo cadena
};

const zeroFillPayWayOne = (cardMonth, cardYear) => {
  let width = 6;
  const date = `20${cardYear}${cardMonth}`;
  const dateCard = parseInt(date);

  width -= dateCard.toString().length;
  if (width > 0) {
    return (
      new Array(width + (/\./.test(dateCard) ? 2 : 1)).join("0") + dateCard
    );
  }
  return dateCard + ""; // siempre devuelve tipo cadena
};

const formatCodePromotional = (value) => {
  var text = value.replace(/\s+/g, "");
  const textFormat = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return textFormat.toLowerCase();
};

export {
  categoriesDefault,
  expCardDate,
  expCardNumber,
  expCardCVC3,
  expCardCVC4,
  limitProductsRequest,
  limitProductsSuggestedRequest,
  optionsActionSheet,
  ordersHistoryItems,
  optionsSelectMyplace,
  optionsTimeOfArrival,
  initCap,
  visaRegEx,
  mastercardRegEx,
  amexpRegEx,
  validateEmail,
  limitStoresRequest,
  zeroFill,
  formatCodePromotional,
  uppercaseText,
  zeroFillPayWayOne,
  expCardDatePayWayOne,
};
