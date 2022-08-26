import { StyleSheet, Dimensions, Platform } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  spinnerTextStyle: {
    fontSize: 16,
    marginBottom: 20,
    color: THEME.spinner.textColor,
    width: 150,
    textAlign: "center",
    fontWeight: "normal",
  },
});

export default styles;
