import { StyleSheet, Platform, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  information: {
    paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
  },
  productName: {
    fontSize: fontSizeText.Medium - 1,
    color: THEME.text.defaultColor,
    fontWeight: "bold",
  },
  product: {
    height: 25,
  },
  price: {
    color: THEME.text.success,
    fontSize: 18,
    marginRight: 20,
  },
  productDescription: {
    fontSize: fontSizeText.MiniSmall,
    color: THEME.text.defaultColor,
  },
  productData: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  quantityLabel: {
    color: THEME.whiteColor,
    fontWeight: "bold",
  },
  commentaryText: {
    color: THEME.primary,
    fontSize: 12,
    textAlign: "justify",
  },
  badgeStyle: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textRestriction: {
    fontSize: fontSizeText.MiniSmall,
    color: THEME.pronto.red,
    fontWeight: "bold",
  },
});

export default styles;
