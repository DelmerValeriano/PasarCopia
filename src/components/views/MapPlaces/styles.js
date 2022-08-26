import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  direction: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonGeolocation: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: "83%",
  },
});
export default styles;
