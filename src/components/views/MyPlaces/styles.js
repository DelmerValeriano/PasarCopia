import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: THEME.whiteColor,
    paddingTop: 20,
  },
  text: {
    textAlign: "center",
  },
});

export default styles;
