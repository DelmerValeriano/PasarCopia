import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  containerScroll: { paddingHorizontal: 30, paddingBottom: 30 },
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
    fontSize: fontSizeText.Large,
    marginTop: 10,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: fontSizeText.Medium,
    textAlign: "center",
    marginBottom: 20,
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
