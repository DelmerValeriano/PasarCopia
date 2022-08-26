import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: width * 0.05,
  },
  row: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerCard: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    width: width * 0.9,
    height: 200,
  },
  containerCardNumber: {
    width: "90%",
  },
  containerChip: {
    width: "90%",
    alignItems: "flex-start",
  },
  containerDate: {
    flexDirection: "row",
    marginVertical: 10,
  },
  containerLogo: {},
  logo: {
    width: 60,
    height: 20,
  },
  chipIcon: {
    width: 50,
    height: 50,
  },
  cardName: {
    color: "white",
    fontSize: width * 0.035,
  },
  cardNumber: {
    color: "white",
    fontSize: width * 0.05,
  },
  cardDate: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  cardDateTitle: {
    color: "white",
    fontSize: 6,
  },
});

export default styles;
