import React from "react";
import { View, Platform } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./styles";
import Image from "react-native-remote-svg";
import PRONTO_ANIMATED_ISOTYPE from "./../../../static/pronto-animated-isotype";

const OverlaySpinner = ({
  visible,
  hideLabel = false,
  label = "Cargando...",
  overlayColor = "rgba(0, 0, 0, 0.8)",
}) => {
  return (
    <Spinner
      visible={visible}
      textContent={!hideLabel && label}
      textStyle={styles.spinnerTextStyle}
      customIndicator={
        <View
          style={{
            paddingRight: Platform.OS === "ios" ? 50 : 0,
            paddingTop: Platform.OS === "ios" ? -10 : 20,
          }}
        >
          <Image
            source={{
              uri: `data:image/svg+xml;utf8,${PRONTO_ANIMATED_ISOTYPE}`,
            }}
            style={{
              height: Platform.OS === "ios" ? 60 : 70,
            }}
          />
        </View>
      }
      overlayColor={overlayColor}
    />
  );
};

export default OverlaySpinner;
