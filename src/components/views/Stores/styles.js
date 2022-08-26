import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: THEME.categoriesTabs.tabYellowSelected,
  },
  tabStyle: {
    backgroundColor: THEME.pronto.yellow,
  },
  textStyle: {
    color: THEME.categoriesTabs.textColorYellowTab,
    textAlign: "center",
  },
});
export default styles;
