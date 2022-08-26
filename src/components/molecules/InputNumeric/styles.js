import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  quantity: {
    fontSize: fontSizeText.Large,
    color: THEME.text.defaultColor,
  },
  productQuantity: {
    fontSize: fontSizeText.Large,
    textAlign: "center",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    height: 60,
    fontSize: fontSizeText.Large,
    paddingLeft: 4,
    width: 40,
    textAlign: "center",
    color: "black",
  },
});
export default styles;
