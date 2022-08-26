import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 20, backgroundColor: "white" },
  textEmpty: {
    fontSize: fontSizeText.Medium,
    color: THEME.grayColor,
  },

  container: {
    marginLeft: 20,
    marginRight: 9,
  },

  containerText: {
    alignContent: "center",
  },
  text: {
    fontSize: fontSizeText.Medium + 3,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
});

export default styles;
