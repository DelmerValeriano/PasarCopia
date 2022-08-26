import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  containerServices: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: "20%",
  },
  logoImage: {
    height: 18,
    width: 18,
    resizeMode: "stretch",
  },
  backgroundIcon: {
    width: 30,
    height: 30,
    backgroundColor: THEME.pronto.yellow,
    borderRadius: 15,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
});
export default styles;
