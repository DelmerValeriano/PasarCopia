import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { THEME } from "../../../styles";
import styles from "./styles";

const RadioButton = ({
  title,
  selected,
  iconName = "md-checkmark",
  iconSize,
  iconColor = THEME.pronto.green,
  value,
  action,
  total,
}) => {
  const responseAction = () => {
    action({ [value]: true }, total);
  };
  return (
    <TouchableOpacity
      style={[
        styles.root,
        { backgroundColor: selected ? THEME.pronto.green : THEME.whiteColor },
      ]}
      onPress={responseAction}
    >
      <Text
        style={[styles.title, { color: selected ? "white" : THEME.grayColor }]}
      >
        {title}
      </Text>
      <View
        style={[
          styles.circle,
          {
            backgroundColor: selected ? "white" : "transparent",
            borderColor: selected ? "white" : THEME.grayColor,
          },
        ]}
      >
        {selected && (
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;
