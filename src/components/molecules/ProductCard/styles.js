import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
const { width } = Dimensions.get("window");
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  cardProduct: {
    marginTop: 12,
    paddingTop: 10,
    marginBottom: 2,
    width: (width - 80) * 0.35,
    height: (width - 80) * 0.51,
    marginHorizontal: 7,
    backgroundColor: THEME.whiteColor,
    justifyContent: "space-around",
  },
  productImage: {
    resizeMode: "cover",
    width: (width - 60) * 0.25,
    height: (width - 60) * 0.25,
  },
  nameContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  nameProduct: {
    fontSize: fontSizeText.MiniSmall,
    fontWeight: "400",
    textAlign: "left",
    textTransform: "capitalize",
    color: THEME.text.defaultColor,
  },
  priceProduct: {
    fontSize: fontSizeText.MiniSmall,
    textAlign: "left",
    color: THEME.blackColor,
    fontWeight: "bold",
  },
  priceContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  productPrice: {
    fontSize: fontSizeText.Medium,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  add: {
    backgroundColor: THEME.purpleColor,
    marginTop: 5,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  Textadd: {
    color: "white",
    textAlign: "center",
    fontSize: 11,
  },

  textAddCart: {
    marginTop: 10,
    fontSize: fontSizeText.MiniSmall,
    textAlign: "center",
    color: THEME.blackColor,
    // fontWeight: "bold",
  },
  textInput: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: fontSizeText.Large + 10,
    fontSize: fontSizeText.Medium,
    marginHorizontal: 10,
  },

  icon: {
    fontSize: 30,
  },
  badge: {
    height: 25,
    width: 25,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: 14,
  },
  label: {
    color: THEME.blackColor,
    fontSize: 12,
  },
  textRestriction: {
    fontSize: fontSizeText.MiniSmall - 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  containerRestriction: {
    width: (width - 120) * 0.1,
    height: "auto",
    backgroundColor: THEME.pronto.red,
    marginTop: 1,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonGroupsCart: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  contentCart: {
    alignItems: "flex-end",
    alignContent: "center",
    justifyContent: "center",
    paddingRight: 1,
    flex: 1,
  },
  contentImg: {
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    width: 80,
    zIndex: 1,
  },
  root: {
    backgroundColor: THEME.pronto.yellow,
    borderWidth: 1,
    borderColor: THEME.pronto.yellow,
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: 22,
    zIndex: -1,
  },
  textRoot: {
    color: THEME.blackColor,
    fontSize: 10,
    fontWeight: "bold",
  },
});
export default styles;
