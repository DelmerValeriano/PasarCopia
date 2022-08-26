import React, { useEffect } from "react";
import { View, Text, Image, BackHandler } from "react-native";
import wrappedView from "./../../../WrappedView";
import styles from "./styles";
import { Button } from "./../../atoms";
import { Actions } from "react-native-router-flux";
import { THEME } from "../../../styles";

const CongratulationsView = ({ points = null }) => {
  useEffect(() => {
    const backAction = () => {
      Actions.homeView();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.root}>
      <Image
        style={styles.brand}
        source={require("./../../../imgs/logos/pronto-logo.png")}
        resizeMode='contain'
      />
      <View>
        <Text style={[styles.text, styles.tittle]}>
          ¡Gracias por tu compra!{" "}
        </Text>
        {points ? (
          <Text style={[styles.text, styles.message]}>
            Felicidades, por haber realizado tu pedido en Tiendas Pronto te
            hemos regalado{/* {points} */} nuevos puntos.
          </Text>
        ) : null}
        <Text style={[styles.text, styles.message]}>
          Tu orden ha sido recibida y está siendo procesada exitosamente.
        </Text>

        <Text style={[styles.text, styles.message]}>
          ¡Esperamos que disfrutes!
        </Text>
        <View style={styles.contentBrand}>
          <Image
            style={styles.brand}
            source={require("./../../../imgs/logos/logo-pronto.png")}
            resizeMode='contain'
          />
        </View>
        <View
          style={{
            flex: 0.85,
            justifyContent: "flex-end",
          }}>
          <Button
            title='Volver al inicio'
            height={60}
            disabled={false}
            borderRadius={0}
            marginTop={10}
            event={() => {
              Actions.homeView();
            }}
            background={THEME.pronto.green}
          />
        </View>
      </View>
    </View>
  );
};

const CongratulationsConfigView = {
  showHeader: false,
};

export default wrappedView(CongratulationsView, CongratulationsConfigView);
