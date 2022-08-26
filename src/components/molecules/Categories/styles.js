import { StyleSheet, Dimensions } from "react-native";
import { fontSizeText } from "../../../commons/consts/sizes";
const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  card: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: fontSizeText.Large,
    fontWeight: "bold",
    color: "black",
  },
  filters: {
    paddingVertical: 10,
  },
});

export default styles;
