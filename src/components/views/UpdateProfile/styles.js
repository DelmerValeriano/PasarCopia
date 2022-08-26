import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  containerScroll: { justifyContent: "center" },
  headerInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  brand: {
    height: 70,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
  },
  signUpForm: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 20,
  },
  headerInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 15,
  },
  containerLogo: {
    width: 115,
    height: 115,
    borderRadius: 400 / 2,
    backgroundColor: THEME.blackColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default styles;
