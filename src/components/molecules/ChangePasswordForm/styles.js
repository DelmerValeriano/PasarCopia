import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 10,
  },
  button: {
    height: 50,
    width: "100%",
    marginTop: 15,
  },
  signInButton: {
    backgroundColor: THEME.pronto.green,
    height: 50,
  },
  signInButtonLabel: {
    fontSize: 16,
  },
});

export default styles;
