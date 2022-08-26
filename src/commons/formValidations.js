import { validateEmail } from "../commons/consts/consts";
import { getIsAnonymous } from "../commons/user";

export const validateShippingProcessFormStep1 = (
  values,
  orderType,
  country
) => {
  const error = {
    message: "",
  };
  const {
    // shippingPlace: { placeLevel1, placeLevel2, placeLevel3, fullAddrress },
    shippingOwner: { name, phone, rtn, nameRtn, email },
  } = values;

  // if (!placeLevel1.id) {
  //   error.message += "El departamento es requerido\n";
  // }
  // if (!placeLevel2.id) {
  //   error.message += "El municipio es requerido\n";
  // }
  // if (!placeLevel3.id) {
  //   error.message += "La colonia es requerida\n";
  // }
  // if (!fullAddrress) {
  //   error.message += "La dirección completa es requerida\n";

  // }
  if (!phone) {
    error.message += "El teléfono es requerido\n";
  } else if (phone.length < 8) {
    error.message += "El teléfono debe tener 8 caracteres\n";
  }
  if (!name) {
    error.message += "El nombre es requerido\n";
  }
  if (getIsAnonymous()) {
    if (!email) {
      error.message += "El correo electrónico es requerido\n";
    } else {
      if (!validateEmail(email)) {
        error.message += "El correo electrónico tiene un formato incorrecto\n";
      }
    }
  }
  if (rtn) {
    if (country === "honduras") {
      rtn.length < 14 && (error.message += "El RTN debe tener 14 caracteres\n");
    } else if (country === "el-salvador") {
      rtn.length < 9 && (error.message += "El RTN debe tener 14 caracteres\n");
    }

    if (!nameRtn) {
      error.message += "El nombre de la empresa es requerido\n";
    }
  }
  if (!values.timeOfArrival && orderType === "pick") {
    error.message += "El tiempo de llegada es requerido\n";
  }

  return error.message;
};

export const validateShippingProcessFormStep2 = (values) => {
  const error = {
    message: "",
  };
  const {
    cash: { active: activeCash, needReturned },
    card: { active: activeCard, card },
    points: { active: activePoints, enoughPoints, needPoints },
  } = values;

  if (activePoints) {
    if (enoughPoints) {
      error.message = "";
    } else {
      if (activeCash) {
        if (needReturned.bool) {
          if (!needReturned.value) {
            error.message =
              "Debe ingresar el monto del efectivo con el cual pagará";
          } else {
            error.message = "";
          }
        } else if (needReturned.bool === false) {
          error.message = "";
        } else {
          error.message =
            "Debe seleccionar una opción a la pregunta ¿Necesita cambio?";
        }
      } else if (activeCard) {
        if (!card) {
          error.message = "Debe seleccionar una tarjeta para poder continuar";
        } else {
          error.message = "";
        }
      } else {
        error.message = "Debe seleccionar un metodo de pago";
      }
    }
  } else {
    if (activePoints !== false) {
      error.message =
        "Debe seleccionar una opción a la pregunta ¿Desea utilizar sus puntos? ";
    } else {
      if (activeCash) {
        if (needReturned.bool) {
          if (!needReturned.value) {
            error.message =
              "Debe ingresar el monto del efectivo con el cual pagará";
          } else {
            error.message = "";
          }
        } else if (needReturned.bool === false) {
          error.message = "";
        } else {
          error.message =
            "Debe seleccionar una opción a la pregunta ¿Necesita cambio?";
        }
      } else if (activeCard) {
        if (!card) {
          error.message = "Debe seleccionar una tarjeta para poder continuar";
        } else {
          error.message = "";
        }
      } else {
        error.message = "Debe seleccionar un metodo de pago";
      }
    }
  }
  return error.message;
};
export const validateRegisterMyPlaceForm = (values) => {
  const error = {
    message: "",
  };
  const {
    myPlace: { fullAddrress, addressType },
  } = values;

  if (!addressType) {
    error.message += "El tipo de lugar es requerido\n";
  }

  if (!fullAddrress) {
    error.message += "La dirección completa es requerida\n";
  }

  return error.message;
};

export const ageRestrictionValidateOnProducts = (products) => {
  let validation = null;

  for (const element of products) {
    const { ageRestriction, ageRestriction21years } = element;
    if (ageRestriction !== undefined || ageRestriction21years !== undefined) {
      if (ageRestriction || ageRestriction21years) {
        validation = true;
        break;
      } else {
        validation = false;
      }
    }
  }

  return validation;
};
