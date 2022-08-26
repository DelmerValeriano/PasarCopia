import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  containerScroll: { justifyContent: "center", padding: 30 },
  headerInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 26,
    marginTop: 10,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 15,
  },
  signInForm: {
    height: 240,
  },
  otherOptions: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  createAccount: {
    height: 50,
    backgroundColor: THEME.pronto.red,
    marginBottom: 15,
  },
  createAccountLabel: {
    color: THEME.whiteColor,
    fontSize: 16,
  },
  forgotPassword: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
  },
  containerLogo: {
    width: 115,
    height: 115,
    borderRadius: 400 / 2,
    backgroundColor: THEME.blackColor,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
