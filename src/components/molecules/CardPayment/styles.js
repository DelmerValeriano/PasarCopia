import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.text.defaultColor,
    fontSize: 18,
  },
  ButtonSelect: {},
  selectItems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.text.defaultColor,
    height: 70,
  },
  logo: {
    width: 60,
    height: 20,
  },
  logoView: {
    backgroundColor: THEME.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  infoCardView: {
    flex: 1,
    justifyContent: "center",
  },
  cardNameText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardNumberText: {
    fontSize: 16,
  },
  icon: {
    alignSelf: "center",
    fontSize: 30,
    color: THEME.pronto.yellow,
    paddingHorizontal: 2,
  },
});
export default styles;
