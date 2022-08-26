import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { THEME } from "./../../../styles";
import styles from "./styles";
import { iconSizes } from "../../../commons/consts/sizes";

const RoundedButton = ({
  event,
  name,
  color,
  iconSize = iconSizes.Large,
  radius = 40,
  disabled,
  borderRadius = radius,
  backgroundColor = THEME.whiteColor,
  borderColor = THEME.borderColor,
  zIndex = 1,
}) => {
  return (
    <TouchableOpacity
      onPress={event}
      style={[
        styles.root,
        {
          height: radius,
          width: radius,
          borderRadius,
          backgroundColor,
          borderColor,
          zIndex,
        },
      ]}
      disabled={disabled}
    >
      <Icon name={name} size={iconSize} color={color} />
    </TouchableOpacity>
  );
};
export default RoundedButton;
