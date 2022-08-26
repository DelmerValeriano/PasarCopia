import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: THEME.whiteColor,
  },
  noProductsText: {
    padding: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  addProducts: {
    flexDirection: "row",
    paddingHorizontal: 15,
    alignContent: "center",
    alignItems: "center",
  },
  textColor: {
    color: THEME.blackColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  noProductsText: { padding: 20, textAlign: "center", fontWeight: "bold" },
  containerButton: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "transparent",
    marginVertical: 5,
  },

  contentAddProducts: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: THEME.pronto.green,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 0.5,
  },

  colum1: {
    justifyContent: "center",
    alignItems: "center",
    width: "47.5%",
  },

  colum2: {
    justifyContent: "center",
    alignItems: "center",
    width: "47.5%",
  },
});
export default styles;
