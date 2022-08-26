import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  selectItems: {
    flex: 5.8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.text.defaultColor,
    height: 50,
  },
  contentView: {
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: THEME.blackColor,
    fontSize: 17,
    paddingHorizontal: 10,
  },
  titleDisabled: {
    color: THEME.text.defaultColor,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  iconView: {
    flex: 0.5,
    padding: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
