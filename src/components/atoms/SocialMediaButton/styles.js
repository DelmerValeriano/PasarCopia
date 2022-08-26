import { StyleSheet, Platform, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import { THEME } from "../../../styles";
const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.colorLine,
    marginHorizontal: "2%",
    borderRadius: (width - 100) * 0.1,
    height: (width - 100) * 0.15,
    borderWidth: 0.2,
    borderColor: THEME.grayColor,
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  col1: {
    flex: 1,
  },
  col2: {
    width: 70,
  },
  title: { textAlign: "center" },
  logoImage: {
    resizeMode: "contain",
    width: (width - 130) * 0.1,
    height: (width - 130) * 0.1,
  },
});

export default styles;
