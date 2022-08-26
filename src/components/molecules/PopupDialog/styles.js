import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {},
  btnLeft: {
    backgroundColor: THEME.pronto.green,
  },
  content: {
    padding: 25,
  },
  btnRight: {
    backgroundColor: THEME.primary,
  },
  textStyle: {
    color: THEME.whiteColor,
  },
  textStyleTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
