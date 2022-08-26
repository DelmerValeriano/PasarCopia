import { StyleSheet, Platform, Dimensions } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.pronto.green,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    height: 50,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: THEME.grayColor,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  circle: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "white",
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
