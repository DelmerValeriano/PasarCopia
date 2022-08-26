import React, { useState, useContext } from "react";
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import { Actions } from "react-native-router-flux";
import { View, ScrollView, Platform, Alert } from "react-native";
import { Button } from "../../atoms";
import { CreditCardForm, Spinner } from "./../../molecules";
import wrappedView from "./../../../WrappedView";
import {
  creditCardRegexValidations,
  creditCardRequiredValidations,
} from "../../../commons/consts/formaValidations";
import {
  expCardDate,
  expCardDatePayWayOne,
  expCardCVC3,
  expCardCVC4,
  visaRegEx,
  mastercardRegEx,
  amexpRegEx,
  zeroFill,
  zeroFillPayWayOne,
} from "../../../commons/consts/consts";
import { getUid } from "../../../commons/user";
import { THEME } from "../../../styles";
import { countryContext } from "../../../contexts/countryProvider";
import styles from "./styles";

const configCardCredit = { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY };
const cardKeyStoredSuccessfully =
  Platform.OS == "ios"
    ? "key stored successfully"
    : "stored ciphertext in app storage";

const NewCreditCard = ({
  showAlert,
  creditCards,
  event,
  creditCardDetail,
  position,
  selectedCreditCardDetail,
  eventCardListUpdate,
  getCardSelected,
}) => {
  const userCredentialCreditCard = `${getUid()}`;
  // States Initials
  const creditCardInitialState = selectedCreditCardDetail
    ? creditCardDetail
    : {
        cardName: "",
        cardDate: "",
        cardCVC: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
      };
  const cardNumberInitialState = selectedCreditCardDetail
    ? `xxxx xxxx xxxx ${creditCardDetail.cardNumber.substring(12, 16)}`
    : "";

  const [cardName, setCardName] = useState(creditCardInitialState.cardName);
  const [cardNumber, setCardNumber] = useState(cardNumberInitialState);
  const [cardCVC, setCardCVC] = useState(creditCardInitialState.cardCVC);
  const [cardDate, setCardDate] = useState(creditCardInitialState.cardDate);
  const [cardMonth, setCardMonth] = useState(creditCardInitialState.cardMonth);
  const [cardYear, setCardYear] = useState(creditCardInitialState.cardYear);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [editMode, setEditMode] = useState({
    inputsDisabled: selectedCreditCardDetail,
    buttonTextLeft: "Remover tarjeta",
    buttonTextRight: "Editar tarjeta",
  });

  const { country } = useContext(countryContext);

  const onChange = (inputName, value) => {
    switch (inputName) {
      case "card-name":
        setCardName(value);
        break;
      case "card-number":
        const formatCardNumber = value.replace(/ /g, "").replace("-", "");

        setCardNumber(formatCardNumber);
        break;
      case "card-cvc":
        setCardCVC(value);
        break;
      case "card-date":
        setCardDate(value);
        break;
      case "card-month":
        setCardMonth(value);
        break;
      case "card-year":
        setCardYear(value);
        break;

      default:
        break;
    }
  };

  const messageForAlert = () => {
    let message = "";
    message += !cardName ? creditCardRequiredValidations.cardName + "\n" : "";
    message += !cardNumber
      ? creditCardRequiredValidations.cardNumber + "\n"
      : "";
    message += !cardCVC ? creditCardRequiredValidations.cardCVC + "\n" : "";
    message += !cardDate ? creditCardRequiredValidations.cardDate + "\n" : "";
    return message;
  };

  const validateCardNumber = (cardNumber) => {
    if (visaRegEx.test(cardNumber) || mastercardRegEx.test(cardNumber)) {
      return true;
    } else if (amexpRegEx.test(cardNumber)) {
      return false;
    } else {
      return false;
    }
  };

  const validExp = (action, date) => {
    let validedAll = false;

    if (!validateCardNumber(cardNumber)) {
      showAlert("Error", creditCardRegexValidations.cardNumber);
    } else if (!expCardCVC3.test(cardCVC) && !expCardCVC4.test(cardCVC)) {
      showAlert("Error", creditCardRegexValidations.cardCVC);
    } else if (cardMonth.length < 2) {
      showAlert("Error", creditCardRegexValidations.cardMonth);
    } else if (
      (country === "honduras" && cardYear.length < 2) ||
      (country === "el-salvador" && cardYear.length < 2)
    ) {
      showAlert("Error", creditCardRegexValidations.cardYear);
    } else if (
      (country === "honduras" && !expCardDate.test(date)) ||
      (country === "el-salvador" && !expCardDatePayWayOne.test(date))
    ) {
      showAlert("Error", creditCardRegexValidations.cardDate);
    } else {
      validedAll = true;
    }

    if (validedAll) {
      if (action === "add-credit-card") {
        setSpinnerVisible(true);
        setTimeout(() => {
          const fields = {
            cardName,
            cardNumber,
            cardCVC,
            cardDate: date,
            cardMonth,
            cardYear,
          };

          registerCard(fields);
        }, 1000);
      } else {
        // Guardar y actualizar la tarjeta
        Alert.alert(
          "Confirmar",
          "¿Desea actualizar los nuevos datos de su tarjeta?",
          [
            {
              text: "Cancelar",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Aceptar",
              onPress: async () => {
                setSpinnerVisible(true);
                setTimeout(async () => {
                  const valueZeroFill =
                    country === "honduras"
                      ? zeroFill(cardMonth, cardYear)
                      : zeroFillPayWayOne(cardMonth, cardYear);
                  await updateCreditCard(valueZeroFill);
                }, 500);
              },
            },
          ],
          { cancelable: true }
        );
      }
    }
  };

  const onPressAddCard = () => {
    if (cardName && cardNumber && cardCVC && cardMonth && cardYear) {
      const valueZeroFill =
        country === "honduras"
          ? zeroFill(cardMonth, cardYear)
          : zeroFillPayWayOne(cardMonth, cardYear);

      validExp("add-credit-card", valueZeroFill);
    } else {
      showAlert("Atención", messageForAlert());
    }
  };

  const successfulCreditCardAlert = (action) => {
    setTimeout(() => {
      if (action === "add-credit-card") {
        // showAlert("Confirmación", "Se ha registrado su tarjeta exitosamente.");
        if (getCardSelected) {
          Actions.pop();
        }
      } else if (action === "update-credit-card") {
        showAlert("Confirmación", "Se ha actualizado la tarjeta.");
      } else {
        showAlert("Confirmación", "Se ha removido la tarjeta.");
      }
    }, 500);
  };

  const failedCreditCardAlert = (error) => {
    setTimeout(() => {
      showAlert(
        "Error",
        "Ha ocurrido un error, vuelva a intentarlo más tarde."
      );
    }, 500);
  };

  const registerCard = async (cardCredentials) => {
    try {
      let credentialCardList = creditCards;
      credentialCardList.push(cardCredentials);

      // Store the credentials
      const cardKey = await RNSecureKeyStore.set(
        userCredentialCreditCard,
        JSON.stringify(credentialCardList),
        configCardCredit
      );
      if (getCardSelected) {
        getCardSelected(cardCredentials);
      }
      cardStoredSuccessfully(cardKey, "add-credit-card");
    } catch (error) {
      failedCreditCardAlert(error);
    }
    setSpinnerVisible(false);
    setTimeout(() => {
      Actions.pop();
    }, 500);
  };

  const cardStoredSuccessfully = (cardKey, action) => {
    if (
      cardKey === cardKeyStoredSuccessfully ||
      cardKey === "key updated successfully"
    ) {
      if (action === "add-credit-card") {
        event();
      } else {
        eventCardListUpdate();
      }
      successfulCreditCardAlert(action);
    } else {
      failedCreditCardAlert("");
    }
  };

  const eventButtonLeft = () => {
    if (editMode.inputsDisabled) {
      Alert.alert(
        "Confirmar",
        "¿Desea eliminar permanentemente esta tarjeta?",
        [
          {
            text: "Cancelar",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              setSpinnerVisible(true);
              setTimeout(async () => {
                await removeCreditCard();
              }, 500);
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      setEditMode((prevState) => ({
        ...prevState,
        inputsDisabled: !editMode.inputsDisabled,
        buttonTextLeft: "Remover tarjeta",
        buttonTextRight: "Editar tarjeta",
      }));
      setCardNumber(
        `xxxx xxxx xxxx ${creditCardDetail.cardNumber.substring(12, 16)}`
      );
    }
  };

  const removeCreditCard = async () => {
    try {
      let creditCards = await RNSecureKeyStore.get(userCredentialCreditCard);
      creditCards = JSON.parse(creditCards);
      creditCards.splice(position, 1);
      const cardKey = await RNSecureKeyStore.set(
        userCredentialCreditCard,
        JSON.stringify(creditCards),
        configCardCredit
      );
      cardStoredSuccessfully(cardKey, "remove-credit-card");
    } catch (error) {
      failedCreditCardAlert(error);
    }
    setSpinnerVisible(false);
    setTimeout(() => {
      Actions.pop();
    }, 500);
  };

  const updateCreditCard = async (date) => {
    try {
      let creditCards = await RNSecureKeyStore.get(userCredentialCreditCard);
      creditCards = JSON.parse(creditCards);
      creditCards.splice(position, 1, {
        cardCVC,
        cardDate: date,
        cardName,
        cardNumber,
        cardMonth,
        cardYear,
      });
      const cardKey = await RNSecureKeyStore.set(
        userCredentialCreditCard,
        JSON.stringify(creditCards),
        configCardCredit
      );
      cardStoredSuccessfully(cardKey, "update-credit-card");
    } catch (error) {
      failedCreditCardAlert(error);
    }
    setSpinnerVisible(false);
    setTimeout(() => {
      Actions.pop();
    }, 500);
  };

  const eventButtonRight = () => {
    if (editMode.inputsDisabled) {
      setEditMode((prevState) => ({
        ...prevState,
        inputsDisabled: !editMode.inputsDisabled,
        buttonTextLeft: "Cancelar",
        buttonTextRight: "Guardar",
      }));
      setCardNumber(creditCardDetail.cardNumber);
      Alert.alert("Editar", "Ahora puede modificar esta tarjeta"); // Opcional
    } else {
      if (cardNumber && cardName && cardCVC && cardMonth && cardYear) {
        const valueZeroFill =
          country === "honduras"
            ? zeroFill(cardMonth, cardYear)
            : zeroFillPayWayOne(cardMonth, cardYear);
        validExp("update-credit-card", valueZeroFill);
      } else {
        showAlert("Atención", messageForAlert());
      }
    }
  };

  const formTitle = selectedCreditCardDetail
    ? "Detalle de la tarjeta"
    : "Agregar el detalle de la tarjeta";
  const formSubTitle = selectedCreditCardDetail
    ? "La información agregada está encriptada para mayor seguridad."
    : "La información agregada será encriptada para mayor seguridad.";

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreditCardForm
          title={formTitle}
          subTitle={formSubTitle}
          cardName={cardName}
          cardNumber={cardNumber}
          cardCVC={cardCVC}
          cardDate={cardDate}
          editMode={editMode}
          onChange={onChange}
          cardMonth={cardMonth}
          cardYear={cardYear}
        />
      </ScrollView>
      <View style={styles.containerButton}>
        {selectedCreditCardDetail ? (
          <>
            <Button
              title={editMode.buttonTextLeft}
              width="50%"
              height={60}
              borderRadius={0}
              marginTop={0}
              event={eventButtonLeft}
              background={THEME.secondary}
            />
            <Button
              title={editMode.buttonTextRight}
              width="50%"
              height={60}
              borderRadius={0}
              marginTop={0}
              event={eventButtonRight}
              background={THEME.pronto.green}
            />
          </>
        ) : (
          <Button
            title="Agregar tarjeta"
            height={60}
            borderRadius={0}
            marginTop={0}
            event={onPressAddCard}
            background={THEME.pronto.green}
          />
        )}
      </View>
      <Spinner visible={spinnerVisible} label="Guardando..." />
    </View>
  );
};

const newCreditCardView = {
  showHeader: true,
  isForm: true,
};

export default wrappedView(NewCreditCard, newCreditCardView);
