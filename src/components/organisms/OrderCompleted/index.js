import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { Button } from "../../atoms";
import { Actions } from "react-native-router-flux";
import { THEME } from "../../../styles";

const OrderCompletedView = () => (
  <View style={styles.root}>
    <Image
      style={styles.brand}
      source={require("./../../../imgs/logos/pronto-logo.png")}
      resizeMode="contain"
    />
    <View>
      <Text style={[styles.text, styles.tittle]}>¡Gracias por tu compra! </Text>
      <Text style={[styles.text, styles.message]}>
        Tu orden ya fue entregada, por favor, ingresa al historial de órdenes
        para ver más detalles de la misma.
      </Text>
      <View style={styles.contentBrand}>
        <Image
          style={styles.brand}
          source={require("./../../../imgs/logos/logo-pronto.png")}
          resizeMode="contain"
        />
      </View>
    </View>
    <Button
      title="Ver Historial de órdenes"
      height={60}
      disabled={false}
      borderRadius={0}
      marginTop={10}
      event={() => {
        Actions.odersHistoryView();
      }}
      background={THEME.pronto.green}
    />
  </View>
);

export default OrderCompletedView;
