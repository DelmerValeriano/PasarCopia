import React, { useContext } from "react";
import { View, Dimensions, Text } from "react-native";
import { Input, ImageCustom } from "../../atoms";
import styles from "./styles";
import { countryContext } from "../../../contexts/countryProvider";

const { width } = Dimensions.get("window");
const height = 15;
const lengthWidth = width * 0.85;
const shortWidth = width * 0.38;
const shortDateWidth = width * 0.12;
const CreditCardForm = ({
  cardName,
  cardNumber,
  cardCVC,
  cardDate,
  editMode,
  onChange,
  title,
  subTitle,
  cardMonth,
  cardYear,
}) => {
  const { country } = useContext(countryContext);

  const changeCardName = (value) => {
    onChange("card-name", value);
  };
  const changeCardNumber = (value) => {
    onChange("card-number", value);
  };
  const changeCardCVC = (value) => {
    onChange("card-cvc", value);
  };
  const changeCardDate = (value) => {
    onChange("card-date", value);
  };

  const changecardMonth = (value) => {
    onChange("card-month", value);
  };

  const changeCardYear = (value) => {
    onChange("card-year", value);
  };

  const maxLengthCardNumber = () => {
    return editMode.inputsDisabled && cardNumber !== "" ? 19 : 19;
  };

  const parseCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <View style={styles.root}>
      <ImageCustom
        image={require("../../../imgs/credit-card-register.png")}
        width={width * 0.9}
        height={width * 0.58}
      />
      <View style={styles.formContent}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>

        <View style={styles.containerInput}>
          <Input
            placeholder="Nombre del titular de la tarjeta"
            value={cardName}
            onChange={changeCardName}
            width={lengthWidth}
            height={height}
            autoCapitalize="characters"
            editable={!editMode.inputsDisabled}
          />
        </View>
        <View style={styles.containerInput}>
          <Input
            placeholder="Número de tarjeta"
            value={parseCardNumber(cardNumber)}
            onChange={changeCardNumber}
            keyboardType="numeric"
            maxLength={maxLengthCardNumber(editMode.inputsDisabled)}
            width={lengthWidth}
            height={height}
            editable={!editMode.inputsDisabled}
          />
        </View>

        <View style={[styles.rowInput, styles.containerInput]}>
          <View style={styles.col1}>
            <View>
              <Input
                placeholder={`MM`}
                value={cardMonth}
                onChange={changecardMonth}
                maxLength={2}
                keyboardType="numeric"
                width={shortDateWidth}
                height={height}
                editable={!editMode.inputsDisabled}
              />
            </View>
            <View style={styles.containerSeparator}>
              <Text style={styles.separator}>/</Text>
            </View>
            <View>
              <Input
                placeholder={`YY`}
                value={cardYear}
                onChange={changeCardYear}
                maxLength={country === "honduras" ? 2 : 2}
                keyboardType="numeric"
                width={shortDateWidth}
                height={height}
                editable={!editMode.inputsDisabled}
              />
            </View>
          </View>
          <View style={styles.col2}>
            <Input
              placeholder="CVC"
              value={cardCVC}
              onChange={changeCardCVC}
              keyboardType="numeric"
              maxLength={4}
              width={shortWidth}
              height={height}
              editable={!editMode.inputsDisabled}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreditCardForm;
