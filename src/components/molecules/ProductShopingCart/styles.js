import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  productImage: {
    resizeMode: "cover",
    width: (width - 30) * 0.25,
    height: (width - 30) * 0.25,
  },

  productDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productsActions: {
    flex: 1,
  },
  buttonGroups: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: fontSizeText.Large + 23,
    fontSize: fontSizeText.Large,
    paddingLeft: 4,
    width: 40,
    textAlign: "center",
    color: THEME.text.defaultColor,
  },
  total: {
    fontSize: fontSizeText.Medium,
    color: THEME.text.defaultColor,
    fontWeight: "bold",
    marginTop: 10,
  },
  numerict: {
    alignItems: "flex-end",
    marginLeft: 20,
    justifyContent: "center",
    paddingTop: 15,
  },
});

export default styles;
