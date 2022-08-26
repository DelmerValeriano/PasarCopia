import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    paddingTop: 10,
    marginBottom: 10,
  },
  time: {
    marginTop: 15,
    marginRight: 15,
  },
  margin: {
    marginTop: 5,
  },
  description: {
    color: THEME.text.defaultColor,
  },
  textTime: {
    width: 72,
    color: THEME.text.defaultColor,
  },
  options: {
    paddingTop: 5,
  },
});

export default styles;
