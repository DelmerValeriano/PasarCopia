import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "./../../../commons/consts/sizes";
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rowInput: {
    flexDirection: "row",
    marginBottom: 20,
  },
  containerInput: {
    marginVertical: 10,
  },
  containerTitle: {
    marginBottom: 15,
  },
  formContent: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
  },
  title: {
    color: THEME.text.blackColor,
    fontWeight: "bold",
    fontSize: fontSizeText.Medium,
    textAlign: "center",
  },
  subTitle: {
    color: THEME.text.defaultColor,
    fontSize: fontSizeText.Small,
    marginTop: 5,
  },
  col1: {
    flex: 1,
    paddingRight: 5,
    flexDirection: "row",
  },
  col2: {
    flex: 1,
    paddingLeft: 5,
  },
  containerSeparator: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  separator: {
    color: THEME.text.defaultColor,
    fontSize: 30,
    transform: [{ rotate: "-15deg" }],
    fontWeight: "300",
  },
});
export default styles;
