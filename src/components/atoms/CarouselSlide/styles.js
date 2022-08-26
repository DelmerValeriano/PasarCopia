import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  imageDetailProduct: {
    width: width,
    height: width * 0.7,
    resizeMode: "contain",
  },
  image: {
    width: width,
    height: width * 0.43,
  },
});

export default styles;
