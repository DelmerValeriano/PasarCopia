import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const EmptyMessage = ({ message }) => {
  return (
    <View style={styles.root}>
      <Text>{message}</Text>
    </View>
  );
};

export default EmptyMessage;
