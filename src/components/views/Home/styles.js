import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttons: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.whiteColor,
  },

  bottomSheet: {
    zIndex: 5,
    backgroundColor: THEME.whiteColor,
  },
  bottomSheetHeader: {
    padding: 16,
    paddingLeft: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.pronto.green,
  },
  bottomSheetLeft: {
    flexDirection: "column",
    alignItems: "center",
  },
  bottomSheetRight: {
    flexDirection: "column",
  },
  bottomSheetTitle: {
    fontFamily: "sans-serif-medium",
    fontSize: 18,
    color: THEME.whiteColor,
    textAlign: "center",
  },
  bottomSheetContent: {
    backgroundColor: THEME.whiteColor,
    // padding: 15,
  },
  scroll: {
    paddingBottom: 60,
  },
  buttonPhone: {
    backgroundColor: THEME.pronto.blue,
  },
  imageHeader: { width: 200, height: 50 },

  contentModal: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    height: "55%",
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: "white",
    paddingBottom: "5%",
  },
  TittleModal: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSizeText.Medium + 2,
  },
  descriptionModal: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionModalError: {
    color: THEME.pronto.yellow,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  containerCategoryDefault: {
    width: width,
    height: width * 0.43,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
