import { StyleSheet, Platform, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
const { width } = Dimensions.get("window");
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  container: {
    width: width * 0.93,
    height: (width - 120) * 0.5,
    marginTop: 15,
  },

  box: {
    marginTop: 15,
    width: width * 0.93,
    height: (width - 120) * 0.5,
    marginRight: 0,
    paddingRight: 5,
    backgroundColor: THEME.whiteColor,
    borderRadius: 10,
  },
  name: {
    fontSize: fontSizeText.Medium * 1.2,
    marginHorizontal: 3,
    padding: 5,
    color: THEME.whiteColor,
    fontWeight: "bold",
    textAlign: "left",
  },
  nameBigger: {
    fontSize: fontSizeText.Large * 3.5,
    fontWeight: "700",
    textShadowColor: THEME.whiteColor,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
    color: "rgba(0, 0, 0, 0.5)",
  },
  image: {
    position: "absolute",
    height: (width - 190) * 0.5,
    width: (width - 190) * 0.5,
  },
  backgroundTextBox: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backgroundTextContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
});

export default styles;
