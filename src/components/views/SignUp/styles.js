import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    backgroundColor: "rgba(255,255,255,0.7)",
    flex: 1,
  },

  containerScroll: { justifyContent: "center", padding: 30 },

  headerInfo: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
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
  signUpForm: {
    marginTop: 60,
    height: 240,
    marginBottom: 60,
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
