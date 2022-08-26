import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "./../../../commons/consts/sizes";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  time: {
    paddingVertical: 10,
    textAlign: "center",
    fontSize: fontSizeText.Medium,
  },
  container: {
    marginBottom: 20,
    backgroundColor: THEME.whiteColor,
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    shadowColor: THEME.blackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 3,
  },
  directionElements: {
    flexDirection: "row",
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 10,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: THEME.borderColor,
  },
  rootInformation: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 15,
  },
  textInformation: {
    fontWeight: "bold",
    fontSize: fontSizeText.Medium,
    textAlign: "justify",
  },
  code: {
    fontSize: fontSizeText.Small,
    color: THEME.whiteColor,
  },
  badge: {
    backgroundColor: THEME.pronto.green,
    alignSelf: "flex-start",
    textAlign: "justify",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  details: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  items: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 5,
    fontSize: fontSizeText.Medium,
  },
  optionQr: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  popup: {
    padding: 20,
  },
});

export default styles;
