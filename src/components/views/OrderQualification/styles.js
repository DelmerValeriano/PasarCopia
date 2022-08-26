import { StyleSheet } from "react-native";
import { fontSizeText } from "./../../../commons/consts/sizes";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  tittleRating: {
    fontSize: fontSizeText.Medium,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  containerRating: {
    marginTop: 45,
    paddingBottom: 15,
    marginBottom: 10,
    backgroundColor: "white",
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.6 },
    shadowOpacity: 0.6,
    shadowRadius: 0.6,
    elevation: 0.6,
    borderRadius: 20,
  },
  contentRating: {
    marginTop: 25,
    marginBottom: 25,
  },
  brand: {
    width: 90,
    height: 90,
    borderRadius: 400 / 2,
    marginTop: "-10%",
  },
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    flex: 1,
    backgroundColor: THEME.whiteColor,
  },
  contentButtons: {
    flexDirection: "row",
  },
  Button: {
    width: "50%",
  },
  textArea: {
    backgroundColor: "#fafafa",
    borderRadius: 20,
    marginHorizontal: 15,
  },
  header: {
    backgroundColor: "black",
    height: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontSize: fontSizeText.Medium + 1,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
