import { StyleSheet, Dimensions, Platform } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 5,
  },
  botton: {
    flexDirection: "row",
    backgroundColor: THEME.whiteColor,
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  icon: {
    height: 30,
    width: 30,
  },
  text: {
    color: THEME.text.defaultColor,
  },
});

export default styles;
