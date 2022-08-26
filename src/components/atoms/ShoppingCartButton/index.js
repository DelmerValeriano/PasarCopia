import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Actions } from "react-native-router-flux";
import styles from "./styles";

const ShoppingCartButton = ({ productsNumber }) => {
  const openShoppingCartModal = () => {
    Actions.shoppingCartModal();
  };

  return (
    <TouchableOpacity onPress={openShoppingCartModal}>
      <Icon name="cart" style={styles.icon} color="white" />
      <View style={styles.badge}>
        <Text style={styles.label}>{productsNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShoppingCartButton;
