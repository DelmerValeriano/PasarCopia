import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: THEME.blackColor,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    textAlign: "center",
    color: THEME.text.whiteColor,
    marginBottom: 20,
  },
  brand: {
    width: 150,
    height: 80,
    textAlign: "center",
  },
  tittle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  message: {
    fontSize: 16,
  },
  contentBrand: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default styles;
