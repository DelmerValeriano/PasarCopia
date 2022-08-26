import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {},
  contentRoot: {
    flexGrow: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  countriesContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  imageHeader: { width: 250, height: 60, marginTop: 20 },
  welcomeText: { color: "white", fontSize: 26 },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
