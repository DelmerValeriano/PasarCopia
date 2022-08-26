import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "./../../../commons/consts/sizes";
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containerScroll: {
    padding: 20,
    backgroundColor: THEME.backgroundAllViews,
    flex: 1,
  },
  container: {
    paddingBottom: 60,
  },
  center: {
    alignItems: "center",
  },
  header: {
    backgroundColor: THEME.pronto.yellow,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: THEME.blackColor,
    marginTop: 20,
  },
  button: {
    marginTop: 15,
    borderColor: THEME.blackColor,
    backgroundColor: THEME.whiteColor,
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    borderWidth: 0.5,
  },
  text: {
    fontSize: 12,
    color: THEME.text.defaultColor,
    marginTop: 15,
  },
  description: {
    padding: 10,
    backgroundColor: THEME.pronto.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: THEME.text.defaultColor,
  },
  textInformation: {
    fontSize: 40,
    color: THEME.blackColor,
  },
  textSize: {
    fontSize: 22,
    marginTop: 10,
  },
  textEmail: {
    fontSize: 16,
    color: THEME.text.defaultColor,
  },
  quantityPoints: {
    fontSize: fontSizeText.Large - 2,
    fontWeight: "400",
    color: THEME.blackColor,
  },
  tittle: {
    fontSize: 18,
    marginTop: 20,
  },
  fontQuantity: {
    fontSize: fontSizeText.Small,
    color: THEME.text.defaultColor,
  },
  subTitle: {
    marginTop: 20,
    fontSize: fontSizeText.Small,
    fontWeight: "bold",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  containerTittlePoints: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  buttonPoints: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
});
export default styles;
