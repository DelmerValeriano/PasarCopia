import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { PopupDialog } from "../";
import QRCode from "react-native-qrcode-svg";
import { Line, RoundedButton } from "./../../atoms";
import styles from "./styles";

const { width } = Dimensions.get("window");

const OrderCard = ({ event, order }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const { fullAddress } = order.shipping;
  const { fullDate } = order.date;

  const openOrderDetails = () => {
    event(order);
  };

  const openCodeQr = () => {
    setVisiblePopup(true);
  };

  return (
    <TouchableOpacity onPress={openOrderDetails} style={[styles.container]}>
      <PopupDialog
        visiblePopup={visiblePopup}
        title="ESCANEA TU PEDIDO"
        eventClose={setVisiblePopup}
        textBtnLeft="Cerrar"
      >
        <QRCode value={order.id} size={width * 0.715} />
      </PopupDialog>
      <View style={styles.directionElements}>
        <View style={styles.centerItems}>
          <Image
            style={styles.image}
            source={require("./../../../imgs/ordersHistory.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.rootInformation}>
          <Text style={styles.textInformation} numberOfLines={2}>
            {order.orderType === "pick" ? "Pedido Pick'N Go" : `${fullAddress}`}
          </Text>
          <View style={styles.badge}>
            <Text numberOfLines={1} style={styles.code}>
              {order.id}
            </Text>
          </View>
        </View>
        <View style={styles.optionQr}>
          <RoundedButton
            name="qrcode"
            radius={40}
            borderRadius={5}
            event={openCodeQr}
          />
        </View>
      </View>
      <Line />
      <Text numberOfLines={1} style={styles.time}>
        {fullDate}
      </Text>
    </TouchableOpacity>
  );
};
export default OrderCard;
