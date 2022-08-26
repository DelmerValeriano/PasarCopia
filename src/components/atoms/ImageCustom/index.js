import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";

const ImageCustom = ({ width, height, image }) => {
  return (
    <View style={styles.root}>
      <Image style={{ width, height }} source={image} />
    </View>
  );
};

export default ImageCustom;
