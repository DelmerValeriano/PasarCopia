import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  contentCallout: {
    width: 240,
    height: "auto",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: THEME.pronto.yellow,
    backgroundColor: "white",
  },
  contentTitle: {
    width: "100%",
    alignItems: "center",
    backgroundColor: THEME.pronto.yellow,
    padding: 8,
  },
  row: {
    flexDirection: "row",
  },
  contentDescription: { padding: 5, width: "90%" },
  textTitle: {
    color: THEME.whiteColor,
    fontSize: 14,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    marginLeft: 8,
    color: THEME.secondary,
    textAlign: "justify",
  },
});

export default styles;
