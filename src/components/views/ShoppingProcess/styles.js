import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { THEME } from "../../../styles";

const progressStepsStyle = {
  activeStepIconBorderColor: THEME.pronto.green,
  activeLabelColor: THEME.blackColor,
  activeStepNumColor: THEME.whiteColor,
  activeStepIconColor: THEME.pronto.green,
  completedStepIconColor: THEME.pronto.green,
  completedProgressBarColor: THEME.pronto.green,
  completedCheckColor: THEME.whiteColor,
  completedLabelColor: THEME.blackColor,
  labelColor: THEME.text.defaultColor,
  disabledStepNumColor: THEME.blackColor,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.whiteColor,
  },
  buttonTextStyle: {
    color: THEME.text.whiteColor,
  },
  nextStepOne: {
    width: width,
    backgroundColor: THEME.pronto.green,
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.055,
  },
  previousBtnStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.47,
    height: height * 0.055,
    color: THEME.whiteColor,
    backgroundColor: THEME.grayColor,
  },
  nextBtnStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.47,
    height: height * 0.055,
    color: THEME.whiteColor,
    backgroundColor: THEME.pronto.green,
  },
});

export { styles, progressStepsStyle };
