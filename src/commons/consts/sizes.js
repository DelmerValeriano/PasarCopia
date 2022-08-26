import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const fontSizeText = {
  Large: width * 0.06,
  Medium: width * 0.04,
  Small: width * 0.035,
  MiniSmall: width * 0.03,
};

const iconSizes = {
  Large: width * 0.06,
  Medium: width * 0.04,
  Small: width * 0.035,
  Small: width * 0.03,
};

export { fontSizeText, iconSizes };
