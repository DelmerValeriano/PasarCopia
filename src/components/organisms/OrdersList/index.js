import React from "react";
import { View } from "react-native";
import { OrderCard } from "../../molecules";
import { Actions } from "react-native-router-flux";
import { EmptyMessage } from "./../../atoms";

const OrdersList = ({ orders }) => {
  const openOrderDetail = (order) => {
    Actions.orderDetails({ order, showOrderHistory: true });
  };

  if (orders.length === 0) {
    return (
      <EmptyMessage message="No ha realizado ningún pedido hasta el momento." />
    );
  }

  return (
    <View style={{ paddingBottom: 20 }}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} event={openOrderDetail} />
      ))}
    </View>
  );
};

export default OrdersList;
