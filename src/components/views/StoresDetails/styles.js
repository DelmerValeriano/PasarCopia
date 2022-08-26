import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { THEME } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    padding: 15,
  },
  card: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabBarUnderlineStyle: {
    backgroundColor: THEME.categoriesTabs.tabYellowSelected,
  },
  tabStyle: {
    backgroundColor: THEME.pronto.yellow,
  },
  textStyle: {
    color: THEME.categoriesTabs.textColorYellowTab,
    textAlign: "center",
  },
  imagen: {
    width: (width - 150) * 0.325,
    height: (width - 150) * 0.325,
  },
  line: {
    borderColor: THEME.pronto.yellow,
  },
  avatar: {
    height: (width - 150) * 0.33,
    width: (width - 150) * 0.33,
    borderRadius: (width - 150) * 0.33,
    backgroundColor: THEME.whiteColor,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 16,
    paddingBottom: 10,
    color: THEME.whiteColor,
  },
  container: {
    marginTop: 12,
    width: (width - 50) * 0.5,
    height: (width - 145) * 0.5,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 10,
  },
  listEmpty: {
    justifyContent: "center",
  },
  containerSchedule: {
    flexDirection: "row",
    marginBottom: 25,
  },
  avatarSchedule: {
    height: 40,
    width: "30%",
    borderRadius: 5,
    backgroundColor: "#fbb626",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    color: "#FFF",
  },
  infoSchedule: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  nameSchedule: {
    fontSize: 16,
  },
  lineSchedule: {
    borderColor: THEME.pronto.yellow,
  },
  avatarScheduleCol1: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "99%",
  },
  avatarScheduleCol2: {
    width: "1%",
  },
  textDay: {
    fontSize: 14,
    color: THEME.categoriesTabs.textColorYellowTab,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: THEME.pronto.yellow,
    transform: [{ rotate: "90deg" }],
  },
});
export default styles;
