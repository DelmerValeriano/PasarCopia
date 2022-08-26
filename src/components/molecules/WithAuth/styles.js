import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: { flex: 1 },
  message: {
    textAlign: "center",
    color: THEME.secondary,
    fontSize: 16,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 50,
  },
});

export default styles;
