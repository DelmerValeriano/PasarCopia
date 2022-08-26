import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingBottom: 20,
  },
  miniImage: {
    width: "90%",
    resizeMode: "contain",
  },
  productImage: {
    width: 80,
    height: "100%",
    resizeMode: "contain",
  },
  imageView: {
    flex: 1,
    height: 85,
    width: 85,
    borderColor: THEME.unSelected,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
  brandView: {
    flex: 2,
    height: 70,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
  col: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
  },
  col1: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  contentTittle: {
    width: "100%",
  },
  col2: {
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontSizeText.Small + 1,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  titleQuantity: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
  },
  icon: {
    fontSize: 25,
    color: THEME.pronto.yellow,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  containerServices: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: "20%",
  },
  service: {
    marginTop: 5,
    width: "33.3%",
    alignItems: "center",
  },
  logoImage: {
    height: 18,
    width: 18,
    resizeMode: "stretch",
  },
  backgroundIcon: {
    width: 27,
    backgroundColor: THEME.pronto.yellow,
    borderRadius: 400 / 2,
    padding: 4,
    alignItems: "center",
  },
  textDescription: {
    textAlign: "center",
    color: THEME.categoriesTabs.textColorYellowTab,
    fontWeight: "500",
    fontSize: 12,
  },
  productAvailability: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 2,
    justifyContent: "center",
  },
  productAvailabilityText: {
    color: "white",
    textAlign: "center",
    fontSize: fontSizeText.MiniSmall - 2.5,
    fontWeight: "bold",
  },
  scheduleButton: {
    backgroundColor: THEME.pronto.yellow,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  description: {
    textAlign: "center",
    fontSize: fontSizeText.MiniSmall - 2,
  },
});
export default styles;
