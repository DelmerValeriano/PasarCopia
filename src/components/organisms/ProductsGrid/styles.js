import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 10,
  },
  itemContainer: {
    alignItems: "center",
    backgroundColor: "white",
  },
  flatList: {
    marginTop: 10,
    paddingBottom: 10,
  },
  flatListContent: {
    alignItems: "center",
  },
  flatListFooter: {
    justifyContent: "center",
    width: 400,
  },
  filters: {
    paddingTop: 20,
  },
});

export default styles;
