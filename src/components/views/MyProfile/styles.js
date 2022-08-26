import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "./../../../styles";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.pronto.green,
    paddingVertical: 10,
    height: (width - 60) * 0.3,
  },

  header: {
    backgroundColor: THEME.blackColor,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100 / 2,
  },

  containerHeaderIcon: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: (width - 40) * 0.12,
  },

  IconProfile: {
    alignSelf: "center",
    fontSize: 40,
    color: "white",
  },
  containerInfo: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 10,
  },
  containerTittle: {
    marginTop: 48,
    alignItems: "center",
  },

  containerIconEdit: {
    marginTop: 3,
    alignItems: "center",
  },
  textTittle: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  item: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: "15%",
    paddingRight: "25%",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colorLine,
  },
  textItem: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textEdit: {
    paddingHorizontal: 40,
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  IconEdit: {
    fontSize: 16,
    color: THEME.pronto.green,
    fontWeight: "bold",
  },
  IconItem: {
    marginRight: 15,
    fontSize: 28,
    color: THEME.pronto.green,
    fontWeight: "bold",
  },
});

export default styles;
