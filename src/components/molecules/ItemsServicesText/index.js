import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../../../styles";

const ItemsServicesText = ({ item }) => {
  const iconColor = THEME.pronto.blue;
  const iconSize = 11;
  const [Service, setServices] = useState([]);
  useEffect(() => {
    handleServices(item);
  }, [item]);

  const handleServices = async (item) => {
    let array = [];
    if (item?.length) {
      for (const element of item) {
        if (element.service) {
          let dataServices = await element.service.get();
          array.push({ ...dataServices.data() });
        } else {
          array.push({ ...element });
        }
      }
    }

    setServices(array);
  };

  return Service.map((item, index) => (
    <View key={index} style={styles.row}>
      <Icon name="md-medical" size={iconSize} color={iconColor} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  ));
};
export default ItemsServicesText;
