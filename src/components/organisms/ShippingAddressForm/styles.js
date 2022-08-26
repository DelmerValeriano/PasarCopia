import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  textArea: {
    borderColor: THEME.text.defaultColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  notesTittle: {
    marginVertical: 15,
  },
  separator: {
    paddingTop: 15,
  },
});
export { styles };
