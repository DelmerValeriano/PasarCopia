import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import wrappedView from "./../../../WrappedView";
import { getOrdersList } from "../../../commons/services/products";
import { getIdToken, getUid } from "../../../commons/user";
import { WithAuth } from "./../../molecules";
import { OrdersList } from "../../organisms";
import styles from "./styles";
import { NavigationEvents } from "react-navigation";

const OrdersHistory = ({ showAlert }) => {
  const [state, setState] = useState({
    spinnerVisible: false,
    ordersHistoryItems: [],
  });

  const getOrdersHistory = async () => {
    if (getUid()) {
      const ordersData = await getOrdersList(await getIdToken());
      if (ordersData.success) {
        setState((prevState) => ({
          ...prevState,
          ordersHistoryItems: ordersData.ordersHistory.sort(
            (a, b) =>
              new Date(b.date.milliseconds) - new Date(a.date.milliseconds)
          ),
          showEmptyHistory: ordersData.ordersHistory.length > 0 ? false : true,
          spinnerVisible: false,
        }));
      } else {
        showAlert(
          "Error",
          "Ocurrió un error al intentar obtener su lista de pedidos, favor intentarlo de nuevo más tarde."
        );
        setState((prevState) => ({ ...prevState, spinnerVisible: false }));
      }
    }
  };

  const updateRecords = () => {};

  const fetchData = async () => {
    await getOrdersHistory(await getIdToken());
  };

  useEffect(() => {
    if (getUid()) {
      setState((prevState) => ({ ...prevState, spinnerVisible: true }));
    }
    fetchData();
  }, []);

  const onWillFocus = () => {
    setState((prevState) => ({ ...prevState, spinnerVisible: true }));
    fetchData();
  };
  return (
    <ScrollView
      style={styles.root}
      refreshControl={
        <RefreshControl
          refreshing={state.spinnerVisible}
          onRefresh={getOrdersHistory}
        />
      }
    >
      <WithAuth resolve={updateRecords}>
        {!state.spinnerVisible && (
          <OrdersList orders={state.ordersHistoryItems} />
        )}
      </WithAuth>
      <NavigationEvents onWillFocus={onWillFocus} />
    </ScrollView>
  );
};

const ordersHistoryConfigView = {
  showHeader: true,
  showShoppingCart: true,
};

export default wrappedView(OrdersHistory, ordersHistoryConfigView);
