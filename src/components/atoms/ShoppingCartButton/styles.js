import { StyleSheet } from "react-native";
import { THEME } from "./../../../styles";

const styles = StyleSheet.create({
  icon: {
    fontSize: 35,
  },
  badge: {
    height: 20,
    width: 20,
    backgroundColor: THEME.shoppingCartButton.badgeColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: 20,
  },
  label: {
    color: THEME.shoppingCartButton.badgeLabel,
    fontSize: 12,
  },
});

export default styles;
