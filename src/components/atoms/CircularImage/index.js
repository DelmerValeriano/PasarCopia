import React from "react";
import { Dimensions, Image } from "react-native";
import styles from "./styles";
const { width } = Dimensions.get("window");
const RADIUS = width * 0.33 - 20;

const CircularImage = ({ image, radius = RADIUS, local }) => {
  return (
    <Image
      style={{ height: radius, width: radius, borderRadius: radius }}
      source={
        !local
          ? {
              uri: `${image}`,
            }
          : image
      }
    />
  );
};
export default CircularImage;
