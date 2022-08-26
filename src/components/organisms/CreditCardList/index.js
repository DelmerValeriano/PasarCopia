import React from "react";
import { View, TouchableOpacity } from "react-native";
import { CreditCard } from "../../molecules";
import {
  masterCardColors,
  visaCardColors,
  amexColors,
} from "../../../commons/consts/colors";
import { Actions } from "react-native-router-flux";

const CardList = ({ creditCardList, eventCardListUpdate, getCardSelected }) => {
  const assignCreditCardLogo = (creditCardNumber) => {
    return creditCardNumber.substring(0, 1) === "4"
      ? require("../../../imgs/creditCard/visa.png")
      : creditCardNumber.substring(0, 1) === "5"
      ? require("../../../imgs/creditCard/masterCard.png")
      : require("../../../imgs/creditCard/americanExpress.png");
  };

  const assignCreditCardColors = (creditCardNumber) => {
    return creditCardNumber.substring(0, 1) === "4"
      ? visaCardColors
      : creditCardNumber.substring(0, 1) === "5"
      ? masterCardColors
      : amexColors;
  };

  const openModalCreditCardDetail = (creditCardDetail, position) => {
    Actions.newCreditCard({
      creditCardDetail,
      position,
      selectedCreditCardDetail: true,
      title: "Detalle de la tarjeta",
      eventCardListUpdate,
    });
  };

  const returnCardSelected = (itemCard) => {
    getCardSelected(itemCard);
    Actions.pop();
  };

  return (
    <View>
      {creditCardList.map((itemCard, index) => (
        <TouchableOpacity
          key={"creditCard_" + index}
          onPress={() => {
            getCardSelected
              ? returnCardSelected(itemCard)
              : openModalCreditCardDetail(itemCard, index);
          }}
        >
          <CreditCard
            colors={assignCreditCardColors(itemCard.cardNumber)}
            cardNumber={`xxxx xxxx xxxx ${itemCard.cardNumber.substring(
              12,
              16
            )}`}
            cardDate={itemCard.cardDate}
            cardName={itemCard.cardName}
            cardMonth={itemCard.cardMonth}
            cardYear={itemCard.cardYear}
            cardImage={assignCreditCardLogo(itemCard.cardNumber)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CardList;
