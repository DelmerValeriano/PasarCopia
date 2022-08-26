import React, { useState, useEffect, useContext } from "react";
import { View, Platform, Alert, Text } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from "react-native-permissions";
import { Actions } from "react-native-router-flux";
import { Button } from "../../atoms";
import { Spinner } from "../../molecules";
import { StoresList } from "../../organisms";
import wrappedView from "../../../WrappedView";
import { getStoresWithSelectedProducts } from "../../../commons/services/stores";
import { fareEstimate } from "../../../commons/services/delivery";
import { THEME } from "./../../../styles";
import styles from "./styles";
import { getLocalUserCountry } from "../../../commons/localstorage";

const configGeolocation = {
  enableHighAccuracy: false,
  timeout: 20000,
  maximumAge: 1000,
};

const SelectStore = ({ showAlert, orderType, products, address }) => {
  const [state, setState] = useState({
    myLocation: address ? address.coordinates : {},
    storesWithProducts: [],
    storeDelivery: {},
    geolocationReady: false,
    loadingLocation: true,
  });

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = async () => {
    try {
      if (address) {
        const { stores, success } = await getStoresWithSelectedProducts(
          address.coordinates.latitude,
          address.coordinates.longitude,
          products,
          "delivery"
        );
        console.log(stores);

        const myLocation = {
          latitude: address.coordinates.latitude,
          longitude: address.coordinates.longitude,
        };
        if (success) {
          if (stores.storeDelivery.id) {
            const country = await getLocalUserCountry();
            const pickupLatLong =
              country === "honduras"
                ? `${stores.storeDelivery.coordinates.longitude},${stores.storeDelivery.coordinates.latitude}`
                : `${stores.storeDelivery.coordinates.latitude},${stores.storeDelivery.coordinates.longitude}`;
            const dropLatLong =
              country === "honduras"
                ? `${address.coordinates.longitude},${address.coordinates.latitude}`
                : `${address.coordinates.latitude},${address.coordinates.longitude}`;

            const pickup = stores.storeDelivery.name;
            const drop = address.fullAddress;
            const localTime = new Date().getHours();

            const shipper_branch_id = stores.storeDelivery?.id_urbano
              ? stores.storeDelivery.id_urbano
              : null;

            const { resultEstimates, success, message } = await fareEstimate(
              pickupLatLong,
              dropLatLong,
              pickup,
              drop,
              shipper_branch_id
            );

            const dataResultEstimates = {
              ...resultEstimates,
              shipper_branch_id,
            };

            if (success) {
              if (country === "honduras" && resultEstimates?.driver) {
                if (stores.storeDelivery.allProducts) {
                  Actions.replace("shoppingProcess", {
                    storeSelected: stores.storeDelivery,
                    orderType,
                    userAddress: address,
                    resultEstimates,
                  });
                } else {
                  storeSelected(stores.storeDelivery, "delivery");
                }
              } else if (
                country === "el-salvador" &&
                ((resultEstimates?.vehicleType && resultEstimates?.driver) ||
                  (shipper_branch_id &&
                    resultEstimates?.message === "Success" &&
                    resultEstimates?.data?.service_name ===
                      "Same Day Service San Salvador"))
              ) {
                if (stores.storeDelivery.allProducts) {
                  Actions.replace("shoppingProcess", {
                    storeSelected: stores.storeDelivery,
                    orderType,
                    userAddress: address,
                    resultEstimates: dataResultEstimates,
                    country,
                  });
                } else {
                  storeSelected(stores.storeDelivery, "delivery");
                }
              } else {
                Actions.pop();
                // await ryteSaturation(address, stores.storeDelivery, user);
                setTimeout(() => {
                  showAlert(
                    "¡Lo sentimos!",
                    localTime <= 18
                      ? `Estamos experimentando saturación en este momento, por favor inténtalo más tarde.`
                      : "Adquiere tus productos favoritos desde la App Tiendas Pronto.\nDelivery 7:00a.m. - 8:00p.m. y \nPick N´ Go 6:00a.m. - 10:00p.m."
                  );
                }, 500);
              }
            } else {
              Actions.pop();
              setTimeout(() => {
                showAlert("¡Lo sentimos!", message);
              }, 500);
            }
          } else {
            Actions.pop();
            setTimeout(() => {
              showAlert(
                "¡Lo sentimos!",
                "En este momento los productos en su carrito no están disponibles en ninguna tienda."
              );
            }, 500);
          }

          setState((prevState) => ({
            ...prevState,
            myLocation,
            geolocationReady: true,
            loadingLocation: false,
            storesWithProducts: stores.storesWithProducts,
            storeDelivery: stores.storeDelivery,
          }));
        }
      } else {
        Geolocation.getCurrentPosition(
          geoSuccess,
          getPermissionToLocation,
          configGeolocation
        );
      }
    } catch (error) {
      showAlert("Error", `${error.message}`);
    }
  };

  const setStates = (changeState) => {
    const { geolocationReady, region, loadingLocation } = changeState;
    if (geolocationReady || !geolocationReady) {
      setState((prevState) => ({
        ...prevState,
        region,
        geolocationReady,
        loadingLocation,
      }));
    } else {
      setState((prevState) => ({ ...prevState, region, loadingLocation }));
    }
  };

  const geoSuccess = async (position) => {
    try {
      const { latitude, longitude } = position.coords;

      const { stores, success } = await getStoresWithSelectedProducts(
        latitude,
        longitude,
        products,
        "pick"
      );
      console.log({ latitude, longitude });

      if (success) {
        const myLocation = {
          latitude,
          longitude,
        };
        setState((prevState) => ({
          ...prevState,
          myLocation,
          geolocationReady: true,
          loadingLocation: false,
          storesWithProducts: stores.storesWithProducts,
        }));
      }
    } catch (error) {
      setState({ loadingLocation: false });
      setTimeout(() => {
        showAlert(
          "Error",
          "Ha ocurrido un error, asegúrese de tener acceso a internet"
        );
      }, 300);
    }
  };

  const getPermissionToLocation = async () => {
    try {
      const response = await request(
        Platform.OS == "ios"
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (response !== RESULTS.GRANTED) {
        openSettingsDevice();
      } else {
        setTimeout(() => {
          showAlert(
            "Importante",
            "No podemos localizarte, activa la ubicación o presiona nuevamente la geolocalización."
          );
        }, 300);
      }
    } catch (error) {
    } finally {
      setStates({ geolocationReady: false, loadingLocation: false });
    }
  };

  const openSettingsDevice = () => {
    Alert.alert(
      "Importante",
      "No podemos localizarte, habilita el acceso a su ubicación.",
      [
        {
          text: "Cancelar",
          onPress: () => {
            setStates({
              geolocationReady: false,
              loadingLocation: false,
            });
          },
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => openSettings().catch((error) => {}),
        },
      ],
      { cancelable: false }
    );
  };

  const storeSelected = (store, origin) => {
    if (origin === "delivery") {
      Actions.replace("selectedStore", {
        store,
        myLocation: state.myLocation,
        orderType,
        userAddress: address,
      });
    } else {
      Actions.selectedStore({
        store,
        myLocation: state.myLocation,
        orderType,
        userAddress: address,
      });
    }
  };

  return (
    <View style={[styles.root]}>
      {orderType === "pick" && (
        <View style={styles.textView}>
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            ¿Dónde reclamará su pedido?
          </Text>
        </View>
      )}
      {state.loadingLocation ? (
        <View style={styles.viewContainer}>
          <Spinner
            visible={state.loadingLocation}
            label="Verificando..."
            overlayColor="#000"
          />
        </View>
      ) : !state.geolocationReady && !state.loadingLocation ? (
        <View style={[styles.viewContainer, { margin: 20 }]}>
          <Text style={[styles.text, { fontSize: 20 }]}>
            Para poder continuar debe autorizar a Pronto para obtener su
            ubicación, inténtalo de nuevo.
          </Text>
          <Button
            title="Reintentar"
            labelStyles={{ fontSize: 20 }}
            background={THEME.pronto.red}
            event={async () => {
              setStates({ loadingLocation: true });
              await getCurrentPosition();
            }}
          />
        </View>
      ) : (
        <StoresList
          stores={state.myLocation ? state.storesWithProducts : []}
          pressedListItem={storeSelected}
          source={orderType}
          products={products}
        />
      )}
    </View>
  );
};
const configStores = {
  showHeader: true,
  showShoppingCart: false,
  showSideMenu: false,
};
export default wrappedView(SelectStore, configStores);
