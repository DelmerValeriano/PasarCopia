import React from "react";
import { View, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Spinner } from "native-base";
import { styles, pickerSelectStyles } from "./styles";
import { THEME } from "../../../styles";

const Select = ({
  placeholder = "Seleccionar",
  items = [{ label: "Seleccionar", value: null }],
  event,
  disabled,
  value,
}) => (
  <View style={styles.input}>
    <RNPickerSelect
      doneText="Hecho"
      value={value}
      disabled={disabled}
      placeholderTextColor={
        disabled ? THEME.text.disbled : THEME.text.defaultColor
      }
      placeholder={{ label: placeholder, value: null }}
      onValueChange={event}
      items={items}
      style={pickerSelectStyles}
      Icon={() => {
        return (
          disabled && <Spinner size="small" color={THEME.text.defaultColor} />
        );
      }}
    />
  </View>
);

export default Select;
