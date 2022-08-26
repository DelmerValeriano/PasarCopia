import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
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
  numericInputContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  infoView: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 1,
    flexDirection: "row",
  },
  infoText: {
    fontSize: 13.5,
    color: THEME.text.defaultColor,
    paddingHorizontal: 5,
    width: 300,
  },
  icon: {
    alignSelf: "center",
    fontSize: 20,
    color: THEME.pronto.yellow,
    paddingHorizontal: 2,
  },
});
export default styles;
