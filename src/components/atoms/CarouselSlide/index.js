import React from "react";
import { Image } from "react-native";
import styles from "./styles";
import { BASE64_PNG } from "../../../commons/consts/images";

const CarouselSlide = ({ image, title, local = false }) => {
  const validateImageType = local ? image : { uri: image };
  return (
    <Image
      style={
        title === "Detalle producto" ? styles.imageDetailProduct : styles.image
      }
      source={validateImageType}
      resizeMode={title === "Detalle producto" ? "contain" : "stretch"}
    />
  );
};

export default CarouselSlide;
