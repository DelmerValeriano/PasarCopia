import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  radioButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  IconItem: {
    marginRight: 15,
    fontSize: 28,
    color: THEME.pronto.green,
    fontWeight: "bold",
  },
  contentCodePromotional: {
    paddingTop: 12,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },

  textCodePromotional: {
    fontWeight: "bold",
  },
  contentPaymentMethod: {
    marginTop: 15,
  },
});
export default styles;
