import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  selectItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 0,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: THEME.text.defaultColor,
    paddingVertical: 2,
  },
  col1: {
    flexDirection: "row",
    alignItems: "center",
  },
  col2: {
    flex: 1,
    justifyContent: "center",
  },
  col3: {
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  titleDisabled: {
    color: THEME.text.defaultColor,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  iconView: {
    flex: 0.2,
    padding: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "white",
    height: 25,
    width: 25,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
