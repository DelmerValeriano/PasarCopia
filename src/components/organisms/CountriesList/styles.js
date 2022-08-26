import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  imageView: {
    paddingVertical: 20,
  },
  select: {
    flex: 3.5,
  },
  selectCountryView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectCountryText: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  selectView: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countryName: { color: "white", fontSize: 20, fontWeight: "bold" },
  radiosSelectView: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    width: "80%",
    borderRadius: 0,
    height: 50,
    marginTop: 30,
  },
});

export default styles;
