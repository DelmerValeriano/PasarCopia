import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },

  tabContent: {
    paddingHorizontal: 15,
    backgroundColor: THEME.whiteColor,
    flex: 1,
  },
  tabBarUnderlineStyle: {
    backgroundColor: THEME.blackColor,
  },
  tabStyle: {
    flex: 1,
    backgroundColor: THEME.pronto.yellow,
  },
  activeTabStyle: {
    backgroundColor: THEME.pronto.yellow,
  },
  textStyle: {
    color: THEME.blackColor,
    textAlign: "center",
    fontSize: fontSizeText.Small,
    fontWeight: "600",
  },
  activeTextStyle: {
    color: THEME.whiteColor,
    textAlign: "center",
    fontWeight: "bold",
  },
  itemContainer: {
    alignItems: "center",
  },
});

export default styles;
