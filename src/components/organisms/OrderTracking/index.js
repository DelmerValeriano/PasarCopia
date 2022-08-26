import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Alert,
  Linking,
} from "react-native";
import {
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Tab,
  Tabs,
  TabHeading,
  Fab,
} from "native-base";
import { WebView } from "react-native-webview";
import { itemsTimeLine } from "./../../../commons/formatData";
import { PurchaseOrder, TimeLine } from "./../../molecules";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import { THEME } from "./../../../styles";
import styles from "./styles";
import { ageRestrictionValidateOnProducts } from "./../../../commons/formValidations";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "./../../atoms";
import { CUSTOMER_SUPPORT_PHONE } from "./../../../commons/consts/credentials";

const { width, height } = Dimensions.get("window");

const OrderTrackinng = ({ state, FabActive = false }) => {
  const [ageRestriction, setAgeRestriction] = useState(null);

  useEffect(() => {
    const { orderHistory } = state.order[0];
    const ageRestriction = ageRestrictionValidateOnProducts(orderHistory);
    setAgeRestriction(ageRestriction);
  }, []);

  const itemsFormat = () => {
    let items = itemsTimeLine(state.order[0]);
    items.forEach((element) => {
      if (element.icon) {
        element.icon = <Icon name="check" size={20} color={THEME.whiteColor} />;
      }
    });

    return items;
  };

  const callPhone = () => {
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
          onPress: () => Linking.openURL(`tel:+${state.order[0].storePhone}`),
        },
      ],
      { cancelable: false }
    );
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
  const buttonImHere = () => {
    const message = `Ya estoy aquí, cliente: ${state.order[0].buyer.fullName}, id de orden: ${state.order[0].id}`;
    Alert.alert(
      "Confirmar",
      `¿Desea enviar un mensaje a la tienda ${state.order[0].storeName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () =>
            handleLinking(
              `whatsapp://send?text=${message}&phone=+${state.order[0].storePhone}`,
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
    <View style={styles.container}>
      {state.isLoading ? (
        <View style={styles.isLoading}>
          <ActivityIndicator size={Platform.OS === "ios" ? "small" : "large"} />
        </View>
      ) : state?.order?.length === 0 ? (
        <View style={styles.isLoading}>
          <Text>No tiene un pedido activo</Text>
        </View>
      ) : (
        <View
          style={{
            height: state.order[0].orderHistory.length * 90 + width * 2,
          }}
        >
          <Tabs tabBarUnderlineStyle={styles.tabSelectedColor}>
            <Tab
              heading={
                <TabHeading style={styles.tabColor}>
                  <Text style={styles.tabText}>Mi Orden</Text>
                </TabHeading>
              }
            >
              <View style={[styles.tabsContent, { padding: 15 }]}>
                <View style={styles.containerHeader}>
                  <View style={styles.col1}>
                    <Text style={styles.tittle}>Mi orden</Text>
                  </View>
                  <View style={styles.col2}>
                    {state?.order[0]?.status === "preparado" &&
                      state?.order[0]?.orderType === "pick" && (
                        <Button
                          title="Ya estoy aquí"
                          height={30}
                          disabled={false}
                          borderRadius={5}
                          marginTop={0}
                          width="90%"
                          event={buttonImHere}
                          background={THEME.pronto.green}
                        />
                      )}
                  </View>
                </View>

                <Text
                  style={styles.text}
                >{`${state.order[0].date.fullDate}.`}</Text>
                <Text style={styles.text}>
                  ID del pedido:{" "}
                  <Text style={styles.highlightedText}>
                    {state.order[0].id}
                  </Text>
                </Text>
                <View
                  style={[
                    { height: state.order[0].orderType === "pick" ? 250 : 280 },
                  ]}
                >
                  <TimeLine data={itemsFormat()} />
                </View>
                <Text style={styles.tittle}>Información de la orden</Text>
                <List>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail
                        source={require("./../../../imgs/shipping.png")}
                      />
                    </Left>
                    <Body style={styles.card}>
                      <Text style={styles.text} numberOfLines={1}>
                        Tipo de pedido:{" "}
                        <Text style={styles.highlightedText}>
                          {state.order[0].orderType === "delivery"
                            ? "Delivery"
                            : "Pick'N Go"}
                        </Text>
                      </Text>
                      {state.order[0].orderType === "delivery" ? (
                        <Text
                          style={styles.text}
                          numberOfLines={1}
                        >{`${state.order[0].shipping.fullAddress}`}</Text>
                      ) : null}
                      <Text style={styles.text} numberOfLines={1}>
                        {state.order[0].shipping.paymentMethod.card
                          ? "Pago con tarjeta"
                          : state.order[0].shipping.paymentMethod.cash
                          ? "Pago en efectivo"
                          : state.order[0].shipping.paymentMethod.points
                          ? "Pago con puntos"
                          : ""}
                      </Text>
                      {ageRestriction ? (
                        <View>
                          <Text
                            style={styles.textRestriction}
                            numberOfLines={1}
                          >
                            Importante
                          </Text>
                          <Text
                            style={styles.textRestriction}
                            numberOfLines={1}
                          >
                            Presentar identificación
                          </Text>
                        </View>
                      ) : null}
                    </Body>
                  </ListItem>
                </List>
                <Text style={styles.tittle}>Detalle de orden</Text>
                <View
                  style={{
                    height: state.order[0].orderHistory.length * 80 + 280,
                  }}
                >
                  <PurchaseOrder
                    showOrderHistory={false}
                    shipping={{
                      id: state.order[0].id,
                      name: state.order[0].shipping.suburb,
                      shippingCost: state.order[0].shipping.shippingCost,
                    }}
                    total={state.order[0].total}
                    products={state.order[0].orderHistory}
                    totalDelivery={state.order[0].shipping.shippingCost}
                    orderType={state.order[0].orderType}
                    storeName={state.order[0].storeName}
                    codePromotional={
                      state.order[0].shipping.paymentMethod.codePromotional
                    }
                    points={state.order[0].shipping.paymentMethod.points}
                    cash={state.order[0].shipping.paymentMethod.cash}
                    card={state.order[0].shipping.paymentMethod.card}
                  />
                  <View style={styles.cost}>
                    <Text style={styles.textCost}>Total:</Text>
                    <Text style={styles.textCost}>
                      {formatCurrency(state.order[0].total)}
                    </Text>
                  </View>

                  {state.order[0].totalApplyingDiscount !== null && (
                    <View style={styles.cost}>
                      <Text style={styles.textApplyingDiscount}>
                        Total aplicado el descuento:
                      </Text>
                      <Text style={styles.textApplyingDiscount}>
                        {formatCurrency(state.order[0].totalApplyingDiscount)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Tab>
            {state.order[0].orderType === "delivery" ? (
              <Tab
                heading={
                  <TabHeading style={styles.tabColor}>
                    <Text style={styles.tabText}>Mapa</Text>
                  </TabHeading>
                }
              >
                <View style={styles.tabsContent}>
                  {Array.isArray(state?.order[0]?.deliveryOrder?.deliveries) ? (
                    <WebView
                      source={{
                        uri:
                          state.order[0]?.deliveryOrder?.deliveries[0]
                            ?.result_tracking_link,
                      }}
                    />
                  ) : (
                    <View style={styles.awaitContent}>
                      <Text style={styles.awaitText}>
                        Estamos cargando la información. Por favor, espera un
                        momento.
                      </Text>
                    </View>
                  )}
                </View>
              </Tab>
            ) : null}
          </Tabs>
        </View>
      )}

      {FabActive && (
        <Fab
          direction="up"
          style={styles.buttonWhatsApp}
          position="bottomLeft"
          onPress={callWhatsApp}
        >
          <Icon name="whatsapp" />
        </Fab>
      )}

      {state?.order[0]?.orderType === "pick" && FabActive && (
        <Fab
          direction="up"
          style={styles.buttonPhone}
          position="bottomRight"
          onPress={callPhone}
        >
          <Icon name="phone" />
        </Fab>
      )}
    </View>
  );
};

export default OrderTrackinng;
