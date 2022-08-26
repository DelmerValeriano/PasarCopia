import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  root: {
    height: 70,
    backgroundColor: THEME.blackColor,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: THEME.borderColor,
  },
  colSideMenuIcon: {
    width: 60,
  },
  col1: {
    width: 110,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15,
  },
  col2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  col3: {
    width: 110,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
  },
  title: {
    textAlign: "center",
    fontSize: fontSizeText.Medium + 1,
    fontWeight: "600",
    color: "white",
  },
  icon: {
    fontSize: 40,
  },
  menuIcon: {
    fontSize: 35,
  },
  label: {
    marginLeft: 10,
    fontSize: 17,
    color: "white",
  },
  brandImage: { width: 150, height: 40 },
});

export default styles;
