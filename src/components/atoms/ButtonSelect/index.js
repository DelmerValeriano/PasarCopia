import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const ButtonSelect = ({
  placeholder = "Selecione un item",
  event,
  disabled,
  children,
  styles: customStyles,
  iconName,
  iconSize,
  iconColor = "black",
}) => (
  <TouchableOpacity
    onPress={!disabled && event}
    style={[styles.selectItems, customStyles]}
  >
    <View style={styles.contentView}>
      {children ? (
        children
      ) : (
        <Text style={disabled ? styles.titleDisabled : styles.title}>
          {placeholder}
        </Text>
      )}
    </View>
    {iconName ? (
      <View style={styles.iconView}>
        <Icon name="chevron-down" size={iconSize} color={iconColor} />
      </View>
    ) : null}
  </TouchableOpacity>
);

export default ButtonSelect;
