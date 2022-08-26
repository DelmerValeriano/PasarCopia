import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    backgroundColor: THEME.whiteColor,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
  },
  radioButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  subTitle: {
    paddingVertical: 15,
    fontSize: 15,
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popup: {
    padding: 20,
  },
  options: {
    alignItems: "center",
    paddingTop: 50,
  },
  buttons: {
    borderRadius: 3,
  },
  text: {
    fontSize: 15,
    marginBottom: 3,
    color: THEME.text.defaultColor,
    textTransform: "capitalize",
  },
  textCancelled: {
    fontSize: 15,
    marginBottom: 3,
    color: THEME.redColor,
    fontWeight: "bold",
  },
  highlightedText: {
    color: THEME.blackColor,
    fontWeight: "bold",
  },
});
export default styles;
