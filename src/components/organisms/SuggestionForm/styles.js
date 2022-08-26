import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  image: {
    width: width * 0.22,
    height: width * 0.14,
  },

  col1: {
    width: "35%",
    alignItems: "center",
    alignContent: "center",
  },
  col2: {
    flex: 1,
  },
  textName: {
    fontWeight: "bold",
    fontSize: fontSizeText.Medium,
  },
  Textarea: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.text.defaultColor,
    padding: 10,
  },
});
export { styles };
