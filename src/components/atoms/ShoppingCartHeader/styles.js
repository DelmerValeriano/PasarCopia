import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  cartHeader: {
    height: 60,
    backgroundColor: THEME.whiteColor,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: fontSizeText.Large,
    marginLeft: 20,
    color: THEME.text.defaultColor,
  },
  colorSubTotal: {
    fontSize: fontSizeText.Large,
    color: THEME.text.defaultColor,
  },
});
export default styles;
