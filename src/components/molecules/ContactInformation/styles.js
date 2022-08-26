import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  separator: {
    paddingTop: 15,
  },

  input: {
    height: 55,
    fontSize: 17,
    borderColor: THEME.text.defaultColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default styles;
