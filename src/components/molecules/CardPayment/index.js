import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ButtonSelect } from "../../atoms";
import styles from "./styles";

const CardPayment = ({ actionChange, creditCardSelected }) => {
  const assignCreditCardLogo = (creditCardNumber) => {
    return creditCardNumber.substring(0, 1) === "4"
      ? require("../../../imgs/logos/visa-logo.png")
      : creditCardNumber.substring(0, 1) === "5"
      ? require("../../../imgs/logos/master-card-logo.png")
      : require("../../../imgs/logos/amex-logo.png");
  };
  const cardSelectedFormat = () => {
    return creditCardSelected ? (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.logoView}>
          <Image
            source={assignCreditCardLogo(creditCardSelected.cardNumber)}
            style={styles.logo}
          />
        </View>
        <View style={styles.infoCardView}>
          <Text
            style={styles.cardNameText}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {creditCardSelected.cardName}
          </Text>
          <Text style={[styles.cardNameText, { fontWeight: "normal" }]}>
            {`xxxx xxxx xxxx ${creditCardSelected.cardNumber.substring(
              12,
              16
            )}`}
          </Text>
        </View>
      </View>
    ) : null;
  };

  return (
    <View>
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon style={styles.icon} name="md-card-outline" />
        <Text style={styles.title}>Pagando con</Text>
      </View> */}
      <View style={styles.ButtonSelect}>
        <ButtonSelect
          placeholder="Seleccionar tarjeta"
          event={actionChange}
          children={cardSelectedFormat()}
          styles={{ height: 70 }}
          iconName={"chevron-down"}
          iconSize={20}
        />
      </View>
    </View>
  );
};

export default CardPayment;
