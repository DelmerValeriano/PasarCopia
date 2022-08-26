import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.whiteColor,
  },
  containerButton: {
    flexDirection: "row",
  },
  textContent: {
    fontSize: 16,
  },
});
export default styles;
