import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { THEME } from "./../../../styles";
import styles from "./styles";

const SocialButton = ({
  backgroundColor = THEME.whiteColor,
  image,
  title = "Ingresar",
  event,
}) => {
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.image,
          {
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Image source={image} style={styles.icon} resizeMode="contain" />
      </View>
      <TouchableOpacity onPress={event} style={styles.botton}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialButton;
