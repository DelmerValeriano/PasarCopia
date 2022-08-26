import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { THEME } from "../../../styles";
import styles from "./styles";

const RadioSelect = ({
  children,
  styles: customStyles,
  selected,
  iconName = "md-checkmark",
  iconSize = 20,
  iconColor = THEME.pronto.green,
  action,
  item,
  tittle = null,
}) => {
  const responseAction = () => {
    const response = tittle ? item : item.id;
    action(response);
  };
  return (
    <TouchableOpacity
      style={[
        styles.selectItems,
        {
          ...customStyles,
        },
      ]}
      onPress={responseAction}
    >
      {children && <View style={styles.col1}>{children}</View>}

      <View style={styles.col2}>
        <Text
          style={[
            styles.title,
            {
              color:
                // selected ? THEME.pronto.green :
                "white",
            },
          ]}
        >
          {item.name}
        </Text>
      </View>
      <View style={styles.col3}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: selected ? "white" : "transparent",
              borderColor: "white",
            },
          ]}
        >
          {selected && (
            <Ionicons name={iconName} size={iconSize} color={iconColor} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RadioSelect;
