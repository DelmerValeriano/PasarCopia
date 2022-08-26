import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.whiteColor,
  },
  containerSocialMedia: {
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  containerText: {
    paddingHorizontal: "5%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  text: {
    color: THEME.grayColor,
    fontSize: fontSizeText.small,
  },
});

export default styles;
