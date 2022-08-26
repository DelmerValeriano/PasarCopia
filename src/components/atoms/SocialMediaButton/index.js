import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { THEME } from "./../../../styles";

const SocialButton = ({
  loading,
  disabled,
  event,
  background = THEME.whiteColor,
  marginTop = 15,
  width = "12.5%",
  style,
  img,
}) => {
  const buttonStyles = {
    backgroundColor: background,

    marginTop,
    width,
    ...styles.root,
    ...style,
  };
  onPress = () => {
    event();
  };

  return (
    <TouchableOpacity
      disabled={disabled || loading || !event}
      onPress={onPress}
      style={buttonStyles}
    >
      <View style={styles.row}>
        <View style={[styles.col1, styles.centerItems]}>
          <Image source={img} style={styles.logoImage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
