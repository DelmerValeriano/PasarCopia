import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  detailsProduct: {
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  detailsProductDescription: {
    fontSize: fontSizeText.Medium,
    textAlign: "center",
  },
  priceAndQuantity: {
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textPrice: {
    fontSize: fontSizeText.Medium,
    color: THEME.text.defaultColor,
  },
  price: {
    fontSize: fontSizeText.Large,
    textAlign: "center",
    alignSelf: "center",
  },
  lineVertical: {
    width: 1,
    height: 100,
    backgroundColor: THEME.borderColor,
  },
  lineHorizontal: {
    width: "100%",
    height: 1,
    backgroundColor: THEME.borderColor,
  },

  ContentlineHorizontal: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
  },
  relatedProducts: {
    alignItems: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "center",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  col1: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  col2: {},
  aligCenter: {
    alignItems: "center",
    flex: 1,
  },
  priceDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: fontSizeText.Large,
    fontWeight: "bold",
    textAlign: "center",
  },
  quantity: {
    fontSize: fontSizeText.Medium,
    color: THEME.text.defaultColor,
  },
  existView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  existText: {
    fontSize: fontSizeText.MiniSmall,
    color: THEME.text.defaultColor,
    textAlign: "center",
    paddingHorizontal: 5,
    width: 300,
  },
  icon: {
    alignSelf: "center",
    fontSize: 20,
    color: THEME.pronto.green,
    paddingHorizontal: 2,
  },
  quantityValue: {
    fontWeight: "bold",
    color: THEME.pronto.green,
  },
  textWhere: {
    textAlign: "center",
    fontSize: fontSizeText.Small,
    width: 100,
  },
  containerTextWhere: {
    height: 55,
    paddingStart: 5,
  },
  textRestriction: {
    marginVertical: 10,
    fontSize: fontSizeText.MiniSmall - 0.5,
    textAlign: "center",
    color: THEME.pronto.red,
    fontWeight: "bold",
  },
});
export default styles;
