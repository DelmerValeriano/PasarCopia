import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const style = StyleSheet.create({
  container: {
    borderRadius: THEME.input.borderRadius,
    borderWidth: 1,
    borderColor: THEME.borderColor,
    padding: THEME.input.padding,
    backgroundColor: THEME.whiteColor,
  },
  input: {
    borderWidth: THEME.input.borderWidth,
    fontSize: fontSizeText.Medium,
    padding: 0,
    flex: 1,
  },
  placeholder: {
    color: THEME.text.defaultColor,
    fontWeight: THEME.input.fontWeight,
    fontSize: fontSizeText.Small,
  },
  inputWithIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    height: 40,
  },
  inputWithLabelWrapper: {
    height: 40,
    flex: 1,
  },
  icon: {
    fontSize: fontSizeText.Large,
    color: THEME.input.color,
  },
  alignInput: {
    paddingLeft: 15,
    flex: 1,
  },
});

export default style;
