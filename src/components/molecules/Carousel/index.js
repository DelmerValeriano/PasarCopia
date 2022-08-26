import React, { useRef } from "react";
import Carousel from "react-native-snap-carousel";
import { Dimensions, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const CarouselWrapper = ({
  slides,
  title,
  openModal,
  itemSelect = false,
  children: SlideComponent,
  ...slideProps
}) => {
  const carouselRef = useRef(null);
  const { width } = Dimensions.get("window");

  const _renderCarouselItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => openModal(itemSelect ? item : item.index)}
      >
        <SlideComponent {...item} title={title} />
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      ref={carouselRef} //nuevo
      data={slides}
      renderItem={_renderCarouselItem}
      sliderWidth={width}
      itemWidth={width}
      {...slideProps}
    />
  );
};

export default CarouselWrapper;
