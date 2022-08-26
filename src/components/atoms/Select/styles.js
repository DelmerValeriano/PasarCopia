import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    color: THEME.blackColor,
    height: 50,
    borderColor: THEME.text.defaultColor,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: THEME.blackColor,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: THEME.blackColor,
  },
  iconContainer: {
    top: -15,
    right: 15,
  },
});
