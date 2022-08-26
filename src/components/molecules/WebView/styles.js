import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalView: {
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 4,
  },
  openButton: {
    backgroundColor: THEME.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "50%",
  },
  textStyle: { textAlign: "center", fontWeight: "bold", fontSize: 20 },
  modalText: {
    padding: 20,
  },
  webView: {
    height: height - height * 0.35,
  },
  activityIndicatorStyle: {},
});

export default styles;
