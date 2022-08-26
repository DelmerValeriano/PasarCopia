import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 10,
  },
  button: {
    height: 50,
    width: "100%",
    marginTop: 5,
  },
  signInButton: {
    backgroundColor: THEME.pronto.green,
    height: 50,
    marginBottom: 100,
  },
  signInButtonLabel: {
    fontSize: 16,
  },
});

export default styles;
