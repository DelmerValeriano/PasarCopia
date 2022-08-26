import { StyleSheet } from "react-native";

const THEME = {
  pronto: {
    yellow: "#FDB727",
    green: "#7FC143",
    red: "#CF3339",
    blue: "#111f63",
    purple: "#7E6BAF",
    purpleSelected: "#634f8b",
  },
  generalCategories: {
    yellow: "#FDB727",
    purple: "#7E6BAF",
    geen: "#7FC143",
    orange: "#F58343",
    red: "#CF3339",
    restrictedWhite: ["#FDB727", "#FFFFFF"],
  },
  primary: "#0097a7",
  secondary: "#11293d",
  whiteColor: "#FFFFFF",
  blackColor: "#000",
  existColor: "#5DAA42",
  redColor: "#FF4000",
  orangeColor: "#FFBF00",
  purpleColor: "#8258FA",
  greenColor: "#1EB600",
  borderColor: "#DDD",
  backgroundAllViews: "#F0F0F0",
  colorLine: "#F3F2F1",
  grayColor: "#888888",
  unSelected: "#DADADA",

  text: {
    defaultColor: "#505050",
    whiteColor: "#FFF",
    primaryColor: "",
    secondaryColor: "",
    titleColor: "",
    success: "#67C37F",
    danger: "#CF5B40",
    disbled: "#CCC",
  },
  input: {
    borderWidth: 0,
    fontSize: 14,
    color: "gray",
    fontWeight: "600",
    borderRadius: 20,
    marginVertical: 12,
    padding: 5,
    marginHorizontal: 10,
    borderColor: "#C0C0C0",
  },
  spinner: {
    textColor: "#FFF",
    progressBarColor: "#FFF",
  },
  shoppingCartButton: {
    badgeColor: "#DA4453",
    badgeLabel: "#FFF",
  },
  drawer: {
    background: "#0097a7",
    width: 165,
    height: 125,
  },
  views: {
    home: {
      background: "#F3F3F5",
    },
  },
  categoriesTabs: {
    background: "#0097a7",
    tabSelected: "#11293d",
    textColorTab: "#FFF",
    tabYellowSelected: "#000000",
    textColorYellowTab: "#000000",
  },
};

const globalStyles = StyleSheet.create({
  root: {
    backgroundColor: "#000000",
    flex: 1,
  },
  container: {
    backgroundColor: THEME.backgroundAllViews,
    flex: 1,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME.primary,
  },
});

export { globalStyles, THEME };
