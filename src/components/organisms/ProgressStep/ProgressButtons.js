import React from "react";
import { View } from "react-native";

const ProgressButtons = (props) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 40,
      justifyContent: "space-between",
    }}
  >
    <View style={{ bottom: 20 }}>{props.renderPreviousButton()}</View>
    <View style={{ bottom: 20 }}>{props.renderNextButton()}</View>
  </View>
);

export default ProgressButtons;
