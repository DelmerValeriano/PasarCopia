import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  getCartItems,
  addToCart,
  emptyCart,
} from "../../../commons/localstorage";
import { getSubtotal } from "../../../commons/processOrder";
import { Actions } from "react-native-router-flux";
import { Button } from "./../../atoms";
import { Spinner, PurchaseOrder, PopupDialog } from "../../molecules";
import { THEME } from "../../../styles";
import styles from "./styles";
import { verifyProductExistence } from "./../../../hooks/firebase";

const { width } = Dimensions.get("window");

const MakeOrder = ({
  shippingInfo = { id: "12345", name: "shippingInfo" },
  productsHistory,
  showOrderHistory,
  orderType,
  finalAmount,
  shippingCost,
  orderDate,
  storeName,
  status,
  codePromotional,
  points,
  cash,
  card,
}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const renderToProductList = showOrderHistory ? productsHistory : products;

  const getCart = async () => {
    setProducts(await getCartItems());
    setLoading(false);
  };

  useEffect(() => {
    getCart();
  }, []);

  const openCodeQr = () => {
    setVisiblePopup(true);
  };
  const reorder = () => {
    Alert.alert(
      "Confirmar",
      products.length > 0
        ? "Los productos actuales en el carrito serán removidos, ¿desea continuar?"
        : "¿Desea volver a generar esta orden?",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            await emptyCart();
            for (let i = 0; i < productsHistory.length; i++) {
              if (productsHistory[i].name !== "Costo de envío") {
                const { id, quantity } = productsHistory[i];

                const product = await verifyProductExistence(id);

                if (product?.enabledInZone && product?.ProductExists) {
                  await addToCart({ ...product, quantity, id });
                }
              }
            }
            Actions.pop();
            Actions.shoppingCartModal();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.root}>
      <PopupDialog
        visiblePopup={visiblePopup}
        title="ESCANEA TU PEDIDO"
        eventClose={setVisiblePopup}
        textBtnLeft="Cerrar"
      >
        <QRCode value={`${shippingInfo.id}`} size={width * 0.715} />
      </PopupDialog>

      {showOrderHistory && (
        <>
          <Text style={styles.title}>Mi orden</Text>
          <Text style={styles.text}>{`${orderDate.fullDate}.`}</Text>
          <Text style={styles.text}>
            ID del pedido:{" "}
            <Text style={styles.highlightedText}>{shippingInfo.id}</Text>
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            Tipo de pedido:{" "}
            <Text style={styles.highlightedText}>
              {orderType === "delivery" ? "Delivery" : "Pick'N Go"}
            </Text>
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            Pago {shippingInfo.paymentMethod}
          </Text>
          {status === "cancelado" ? (
            <Text style={styles.textCancelled} numberOfLines={1}>
              Estado: {status}
            </Text>
          ) : (
            <Text style={styles.text} numberOfLines={1}>
              Estado: {status}
            </Text>
          )}
        </>
      )}
      <View>
        <PurchaseOrder
          products={renderToProductList}
          showOrderHistory={showOrderHistory}
          total={getSubtotal(renderToProductList)}
          totalDelivery={finalAmount ? finalAmount : shippingCost}
          shipping={shippingInfo}
          orderType={orderType}
          storeName={storeName}
          codePromotional={codePromotional}
          points={points}
          cash={cash}
          card={card}
        />
      </View>
      {showOrderHistory && (
        <View style={styles.options}>
          <Button
            iconName="qrcode"
            title="Generar código QR"
            width="90%"
            height={45}
            borderRadius={0}
            marginTop={0}
            event={openCodeQr}
            style={{
              ...styles.buttons,
              backgroundColor: THEME.blackColor,
            }}
          />
          {/*   <Button
            iconName="cart"
            title="Volver a pedir"
            width="90%"
            height={45}
            borderRadius={0}
            marginTop={10}
            event={reorder}
            style={{ ...styles.buttons, backgroundColor: THEME.pronto.green }}
          /> */}
        </View>
      )}
      <Spinner visible={loading} />
    </View>
  );
};

export default MakeOrder;
