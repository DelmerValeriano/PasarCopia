import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  storeNameContainer: {
    flex: 0.5,
    justifyContent: "center",
  },
  storeNameText: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  storeProductsListText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  storeProductsListContainer: {
    padding: 10,
  },
  productsNotAvailableView: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 60,
    borderColor: THEME.backgroundAllViews,
  },
  productsNotAvailableText: {
    textAlign: "center",
    color: THEME.pronto.red,
  },
  tabColor: {
    backgroundColor: THEME.whiteColor,
  },
  tabSelectedColor: {
    backgroundColor: THEME.pronto.purple,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default styles;
