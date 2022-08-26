import React from "react";
import { AirbnbRating } from "react-native-ratings";

const Rating = ({ event }) => {
  return (
    <AirbnbRating
      count={5}
      reviews={["Terrible", "Malo", "Bueno", "Muy bien", "Increíble"]}
      reviewSize={12}
      defaultRating={0}
      size={25}
      onFinishRating={event}
    />
  );
};

export default Rating;
