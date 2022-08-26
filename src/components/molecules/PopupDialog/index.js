import React from "react";
import Dialog, {
  DialogContent,
  DialogButton,
  DialogFooter,
  ScaleAnimation,
  DialogTitle,
} from "react-native-popup-dialog";
import { View, Dimensions } from "react-native";
import styles from "./styles";

const animation = new ScaleAnimation({
  initialValue: 0,
  useNativeDriver: true,
});
const { width } = Dimensions.get("window");

const PopupDialog = ({
  visiblePopup,
  title,
  eventClose,
  eventConfirm,
  children,
  textBtnLeft,
  textBtnRight,
}) => {
  return (
    <View style={styles.root}>
      <Dialog
        visible={visiblePopup}
        onTouchOutside={() => eventClose(false)}
        containerStyle={styles.container}
        dialogTitle={
          <DialogTitle textStyle={styles.textStyleTitle} title={title} />
        }
        width={width * 0.8}
        footer={
          textBtnRight ? (
            <DialogFooter>
              <DialogButton
                style={styles.btnLeft}
                textStyle={styles.textStyle}
                text={textBtnLeft}
                onPress={() => eventClose(false)}
              />
              <DialogButton
                style={styles.btnRight}
                textStyle={styles.textStyle}
                text={textBtnRight}
                onPress={() => eventConfirm()}
              />
            </DialogFooter>
          ) : (
            <DialogFooter>
              <DialogButton
                style={styles.btnLeft}
                textStyle={styles.textStyle}
                text={textBtnLeft}
                onPress={() => eventClose(false)}
              />
            </DialogFooter>
          )
        }
        dialogAnimation={animation}
      >
        <DialogContent style={styles.content}>{children}</DialogContent>
      </Dialog>
    </View>
  );
};

export default PopupDialog;
