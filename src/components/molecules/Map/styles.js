import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
  },
  buttonGeolocation: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: "83%",
  },
  buttonOptionsMap: {},
});
export default styles;
