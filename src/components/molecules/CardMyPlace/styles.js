import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  root: {
    borderColor: THEME.borderColor,
    borderWidth: 1,
    borderRadius: 10,
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 20,
    width: width * 0.12,
    height: width * 0.12,
  },
  textInformation: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "justify",
  },
  label: {
    marginTop: 5,
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
