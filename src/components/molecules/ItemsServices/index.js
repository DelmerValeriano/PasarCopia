import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";

const ItemsServices = ({ services }) => {
  return (
    <View style={styles.containerServices}>
      {services.map((element, index) => {
        return (
          <View key={index} style={styles.backgroundIcon}>
            <Image
              source={{
                uri: element.icon,
              }}
              style={styles.logoImage}
            />
          </View>
        );
      })}
    </View>
  );
};
export default ItemsServices;
