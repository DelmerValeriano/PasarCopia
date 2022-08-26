import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },

  text: {
    fontSize: 10,
    marginBottom: 5,
    marginLeft: 8,
    color: THEME.secondary,
    textAlign: "justify",
  },
});
export default styles;
