import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
import { fontSizeText } from "../../../commons/consts/sizes";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {},
  list: {
    paddingTop: 15,
    marginTop: 40,
  },
  tittle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    marginBottom: 3,
    color: THEME.text.defaultColor,
  },
  card: {
    paddingRight: 5,
  },
  cost: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textCost: {
    fontSize: 18,
  },

  textApplyingDiscount: {
    fontSize: 18,
  },

  isLoading: {
    height: height,
    alignItems: "center",
  },
  heightInfo: {
    height: 100,
  },
  heightTimeLine: {
    flex: 5,
  },
  highlightedText: {
    color: "black",
    fontWeight: "bold",
  },
  tabSelectedColor: {
    backgroundColor: THEME.pronto.purple,
  },
  tabColor: {
    backgroundColor: THEME.whiteColor,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "400",
  },
  tabsContent: {
    flex: 1,
    backgroundColor: "white",
  },

  textRestriction: {
    fontSize: fontSizeText.MiniSmall + 2,
    color: "black",
    fontWeight: "bold",
  },

  awaitContent: { flex: 1, alignItems: "center", padding: 20 },
  awaitText: {
    textAlign: "center",
    color: THEME.grayColor,
  },
  containerHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  col1: {
    flex: 1,

    justifyContent: "center",
  },
  col2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWhatsApp: {
    backgroundColor: THEME.greenColor,
  },

  buttonPhone: {
    backgroundColor: THEME.pronto.blue,
  },
});
export default styles;
