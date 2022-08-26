import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText, iconSizes } from "./../../../commons/consts/sizes";
const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    fontSize: iconSizes.Large + 2,
    color: THEME.pronto.green,
  },

  iconChevronRight: {
    alignSelf: "center",
    fontSize: iconSizes.Large + 5,
    color: THEME.grayColor,
  },

  title: {
    fontSize: fontSizeText.Medium,
    fontWeight: "700",
  },
  ContentItem: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: "15%",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
  },
  ItemCol1: {
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
  },
  ItemCol2: {
    flex: 1,
    justifyContent: "center",
  },

  ItemCol3: {
    width: "20%",
    justifyContent: "center",
  },
  iconImg: {
    width: 23,
    height: 23,
  },
});

export default styles;
