import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../../styles";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  isLoading: {
    height,
    alignItems: "center",
    flex: 1,
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
