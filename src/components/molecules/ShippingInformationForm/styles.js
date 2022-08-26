import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    paddingTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separatorText: {
    paddingTop: 15,
  },
  inputTextArea: {
    height: 80,
    borderColor: THEME.text.defaultColor,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    paddingHorizontal: 20,
  },
});
export default styles;
