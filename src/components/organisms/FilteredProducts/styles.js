import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: width * 0.01,
  },
  flatList: {
    paddingBottom: 40,
  },
  flatListContent: {
    paddingBottom: 80,
  },
  isLoading: {
    paddingTop: 20,
  },
  flatListFooter: {
    justifyContent: "center",
    width: 400,
  },
});

export default styles;
