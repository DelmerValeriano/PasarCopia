import { StyleSheet } from "react-native";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 5,
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
    flexDirection: "row",
    flex: 1,
  },
  col2: {
    width: 70,
  },
  title: { textAlign: "center", fontSize: fontSizeText.Small },
  subTitle: { textAlign: "center", fontSize: fontSizeText.MiniSmall - 2 },
  icon: {
    marginLeft: 5,
  },
  rowSubtitle: {
    marginBottom: 8,
  },
});

export default styles;
