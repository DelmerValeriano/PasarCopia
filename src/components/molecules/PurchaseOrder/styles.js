import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 10,
    height: 80,
  },
  detailView: {
    flex: 4.2,
    padding: 10,
  },
  detailText: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 10,
    color: THEME.grayColor,
  },
  ProductTotalView: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ProductTotalText: {
    color: THEME.grayColor,
    fontSize: 18,
  },
  quantityView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  quantitySquare: {
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: THEME.primary,
  },
  quantityLabel: {
    fontWeight: "bold",
  },
  quantityText: {
    fontWeight: "600",
    marginHorizontal: 10,
    color: THEME.grayColor,
    fontSize: 12,
  },
  commentaryText: {
    color: THEME.grayColor,
    fontSize: 14,
    marginHorizontal: 10,
  },
  TotalView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  totalText: {
    fontSize: 30,
  },
  totalTextNumber: {
    fontSize: 30,
    fontWeight: "600",
  },
  line: {
    borderColor: THEME.borderColor,
    borderWidth: 0.5,
  },
  descriptionView: {
    flexDirection: "column",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: THEME.text.defaultColor,
    fontSize: 13,
  },
  textRestriction: {
    fontSize: fontSizeText.MiniSmall - 0.5,
    color: THEME.pronto.red,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
export default styles;
