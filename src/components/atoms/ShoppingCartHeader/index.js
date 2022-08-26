import React from "react";
import { View, Text } from "react-native";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import styles from "./styles";

const ShoppingCartHeader = ({ productsNumber, subTotal }) => (
  <View style={styles.cartHeader}>
    <Text style={styles.colorSubTotal}>SubTotal</Text>
    <Text style={styles.textHeader}> {`${formatCurrency(subTotal)}`}</Text>
  </View>
);

export default ShoppingCartHeader;
