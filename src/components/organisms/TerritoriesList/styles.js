import { StyleSheet } from "react-native";

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
    textAlign: "center",
  },
  selectView: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countryName: { color: "white", fontSize: 20, fontWeight: "bold" },
  radiosSelectView: {
    height: 60,
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

  radioSelect: {
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingRight: 10,
  },
});

export default styles;
