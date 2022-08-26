import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.whiteColor,
  },
  containerButton: {
    paddingBottom: 30,
    height: 60,
  },
  horizontalProducts: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  productDetail: {
    paddingTop: 20,
  },
  instructionsText: {
    color: THEME.primary,
    fontSize: 18,
    marginBottom: 10,
  },
  instruction: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  icon: {
    alignSelf: "center",
    fontSize: 40,
    color: "white",
  },
  containerClose: {
    height: 60,
    width: "100%",
    backgroundColor: "black",
  },
  containerSpinner: {
    flex: 1,
    height: height * 0.8,
  },
});
export default styles;
