import React from "react";
import { View } from "react-native";
import styles from "./styles";

const Line = ({ style: personalStyles }) => (
  <View>
    <View style={[styles.lineStyle, personalStyles]} />
  </View>
);

export default Line;
