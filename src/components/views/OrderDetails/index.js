import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { MakeOrder } from "../../organisms";
import wrappedView from "./../../../WrappedView";
import styles from "./styles";
import { verifyProductExistence } from "./../../../hooks/firebase";

const OrderDetails = ({ navigation }) => {
  const {
    params: { order, showOrderHistory },
  } = navigation.state;

  const [productHistory, setProductHistory] = useState([]);

  useEffect(() => {
    handleVerifyProduct(order.orderHistory);
  }, []);

  const handleVerifyProduct = async (products) => {
    let dataProduct = [];
    for (const product of products) {
      const { id } = product;
      const { enabledInZone, ProductExists } = await verifyProductExistence(id);

      dataProduct.push({ ...product, enabledInZone, ProductExists });
    }
    setProductHistory(dataProduct);
  };

  return (
    <ScrollView style={styles.scrollViewRoot}>
      <View style={styles.root}>
        <MakeOrder
          showOrderHistory={showOrderHistory}
          shippingInfo={{
            id: order.id,
            name: order.shipping.suburb,
            shippingCost: order.shipping.shippingCost,
            paymentMethod: order.shipping.paymentMethod.card
              ? "con tarjeta"
              : "en efectivo",
          }}
          shippingCost={order.shippingCost}
          subtotal={order.subtotal}
          productsHistory={productHistory}
          orderType={order.orderType}
          orderDate={order.date}
          storeName={order.storeName}
          status={order.status}
          codePromotional={order.shipping.paymentMethod.codePromotional}
          points={order.shipping.paymentMethod.points}
          cash={order.shipping.paymentMethod.cash}
          card={order.shipping.paymentMethod.card}
        />
      </View>
    </ScrollView>
  );
};

const OrderDetailsConfigView = {
  showHeader: true,
};

export default wrappedView(OrderDetails, OrderDetailsConfigView);
