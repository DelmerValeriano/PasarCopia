import React from "react";
import { View, TextInput } from "react-native";
import { RoundedButton } from "./../../atoms";
import { THEME } from "./../../../styles";
import styles from "./styles";

const InputNumeric = ({ decreaceQuanty, increaceQuanty, quantity }) => (
  <View style={styles.row}>
    <RoundedButton
      event={decreaceQuanty}
      name="minus"
      color={THEME.text.defaultColor}
      disabled={quantity > 0 ? false : true}
    />
    <TextInput
      style={styles.textInput}
      editable={false}
      defaultValue={`${quantity}`}
    />
    <RoundedButton
      event={increaceQuanty}
      name="plus"
      color={THEME.text.defaultColor}
      disabled={false}
    />
  </View>
);

export default InputNumeric;
