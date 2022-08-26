import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: THEME.whiteColor,
  },
  container: {
    padding: 15,
  },
  separator: {
    marginTop: 15,
  },
});
export default styles;
