import { StyleSheet, Platform, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: THEME.whiteColor,
  },
  name: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    height: width * 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  containerText: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 25,
    paddingVertical: 10,
    width: width,
  },

  text: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },

  rootUser: {
    marginTop: 20,
    flexDirection: "row",
    height: 60,
  },
  col1: {
    width: "60%",
    justifyContent: "center",
    marginLeft: "10%",
  },
  col2: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
    fontSize: 25,
    color: "#f4f4f4",
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#f4f4f4",
  },

  textInformation: {
    fontSize: 16,
    color: THEME.blackColor,
    fontWeight: "bold",
  },
  icon: {
    alignSelf: "center",
    fontSize: 25,
    color: "#000000",
  },
});

export default styles;
