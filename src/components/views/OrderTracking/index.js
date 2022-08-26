import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { OrderTracking, OrderCompleted } from "../../organisms";
import wrappedView from "../../../WrappedView";
import { getOrderActive } from "./../../../commons/services/orders";
import styles from "./styles";
import { Fab } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CUSTOMER_SUPPORT_PHONE } from "./../../../commons/consts/credentials";

const OrderTrackingView = () => {
  const [state, setState] = useState({ isLoading: true, order: [] });

  useEffect(() => {
    getActiveOrders();
  }, []);

  const getActiveOrders = async () => {
    let orderItems = await getOrderActive();
    if (orderItems.length == 0) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        order: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        order: orderItems,
      }));
    }
  };

  const callPhone = async () => {
    let phoneNumber;
    if (Platform.OS === "android") {
      phoneNumber = `tel:+${state.order[0].storePhone}`;
    } else {
      phoneNumber = `telprompt:+${state.order[0].storePhone}`; // Cristian: Hay que verificar esta parte en un dispositivo físico.
    }
    try {
      Alert.alert(
        "Confirmar",
        `¿Desea llamar a la tienda ${state.order[0].storeName}?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Llamar",
            onPress: () => Linking.openURL(phoneNumber),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const callWhatsApp = () => {
    const message = `Hola Tiendas Pronto,`;
    Alert.alert(
      "Confirmar",
      `¿Desea enviar un mensaje a servicio al cliente de Tiendas Pronto?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () =>
            handleLinking(
              `whatsapp://send?text=${message}&phone=+${CUSTOMER_SUPPORT_PHONE}`,
              "https://www.whatsapp.com/"
            ),
        },
      ],
      { cancelable: false }
    );
  };

  const handleLinking = (app, url) => {
    Linking.canOpenURL(app)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(app);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(() => {
        return Linking.openURL(url);
      });
  };

  return (
    <>
      {state.isLoading ? (
        <View style={styles.isLoading}>
          <ActivityIndicator size={Platform.OS === "ios" ? "small" : "large"} />
        </View>
      ) : state.order[0] ? (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <OrderTracking state={state} />
          </ScrollView>
          <Fab
            direction="up"
            style={styles.buttonWhatsApp}
            position="bottomLeft"
            onPress={callWhatsApp}
          >
            <Icon name="whatsapp" />
          </Fab>
          {state?.order[0]?.orderType === "pick" && !state.isLoading && (
            <Fab
              direction="up"
              style={styles.buttonPhone}
              position="bottomRight"
              onPress={async () => await callPhone()}
            >
              <Icon name="phone" />
            </Fab>
          )}
        </View>
      ) : (
        <OrderCompleted />
      )}
    </>
  );
};

const configStores = {
  showHeader: true,
  showShoppingCart: false,
  showSideMenu: false,
};

export default wrappedView(OrderTrackingView, configStores);
