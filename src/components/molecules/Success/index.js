import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const Success = ({ message }) => {
  return (
    <View style={styles.root}>
      <Ionicons name={"md-checkmark-circle-outline"} size={100} color="green" />
      <Text style={styles.title}>{message}</Text>
    </View>
  );
};

export default Success;
