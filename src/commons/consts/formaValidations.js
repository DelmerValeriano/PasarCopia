const creditCardRegexValidations = {
  cardName: "Nombre no es válido",
  cardNumber:
    "El número de tarjeta no es válido \nUtiliza tarjetas de crédito/débito Visa o Mastercard",
  cardCVC: "CVC no es válido",
  cardDate: "Fecha no es válida",
  cardMonth: "El mes en la fecha no es válido",
  cardYear: "El año en la fecha no es válido",
};

const creditCardRequiredValidations = {
  cardName: "Nombre del titular de la tarjeta es requerido",
  cardNumber: "Número de tarjeta es requerido",
  cardCVC: "CVC es requerido",
  cardDate: "Fecha de expiración es requerido",
};

export { creditCardRegexValidations, creditCardRequiredValidations };
