import React, { useState, useEffect, useContext } from "react";
import { View, Text, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Tab, Tabs, TabHeading } from "native-base";
import { Button } from "../../atoms";
import { ContainerList, Map, Spinner } from "../../molecules";
import { getCartItems, removeFromCart } from "../../../commons/localstorage";
import {
  fareEstimate,
  ryteSaturation,
} from "../../../commons/services/delivery";
import wrappedView from "../../../WrappedView";
import { THEME } from "./../../../styles";
import styles from "./styles";
import { AuthUserContext } from "../../../contexts/authUserProvider";
import { getLocalUserCountry } from "../../../commons/localstorage";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
let MAP_REF = null;
let MARKER_REF = {};

const SelectedStore = ({
  showAlert,
  store,
  myLocation,
  orderType,
  userAddress,
}) => {
  const AuthUser = useContext(AuthUserContext);
  const { email, fullName, phone } = AuthUser;
  const [cartFiltered, setCartFiltered] = useState([]);
  const [productsNotAvailable, setproductsNotAvailable] = useState(false);
  const [state, setState] = useState({
    stores: [],
    region: {
      latitude: 14.089564,
      longitude: -87.20257,
      latitudeDelta: ASPECT_RATIO,
      longitudeDelta: ASPECT_RATIO * 0.5,
    },
    myLocation,
    storeNearby: { ...store.coordinates },
  });

  const [loading, setLoading] = useState(false);

  const setStates = (changeState) => {
    setState((prevState) => ({
      ...prevState,
      geolocationReady: changeState.geolocationReady,
    }));
  };

  const getMapRef = (mapRef) => {
    MAP_REF = mapRef;
  };

  const getMarkerRef = (markerRef, storeId) => {
    if (MARKER_REF[storeId] == undefined) {
      MARKER_REF[storeId] = markerRef;
    }
  };

  const changeStateStoreNearby = () => {};

  useEffect(() => {
    getCart();
    getStores();
  }, []);

  const getStores = async () => {
    try {
      if (store) {
        const stores = [];
        stores.push(store);
        if (stores.length) {
          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              stores,
            }));
          }, 2000);
        }
      }
    } catch (error) {}

    setLoading(false);
  };

  const getCart = async () => {
    const cart = await getCartItems();
    let cartReviewed = [];
    cart.forEach((element) => {
      if (store.products.includes(element.id)) {
        cartReviewed.push({ ...element, availableInStore: true });
      } else {
        cartReviewed.push({ ...element, availableInStore: false });
        setproductsNotAvailable(true);
      }
    });
    setCartFiltered(cartReviewed);
  };

  const removeUnavailableItems = async () => {
    setLoading(true);
    try {
      if (productsNotAvailable && store.products.length) {
        for (const item of cartFiltered) {
          if (!item.availableInStore) {
            await removeFromCart(item.id);
          }
        }
        setproductsNotAvailable(false);
        await getCart();
      }
      if (store.products.length) {
        if (orderType === "delivery") {
          const country = await getLocalUserCountry();

          const pickupLatLong =
            country === "honduras"
              ? `${store.coordinates.longitude},${store.coordinates.latitude}`
              : `${store.coordinates.latitude},${store.coordinates.longitude}`;
          const dropLatLong =
            country === "honduras"
              ? `${userAddress.coordinates.longitude},${userAddress.coordinates.latitude}`
              : `${userAddress.coordinates.latitude},${userAddress.coordinates.longitude}`;

          const pickup = store.name;
          const drop = userAddress.fullAddress;
          const localTime = new Date().getHours();
          const user = { email, fullName, phone };

          const shipper_branch_id = store?.id_urbano ? store.id_urbano : null;

          const { resultEstimates, success } = await fareEstimate(
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
            if (country === "honduras") {
              Actions.shoppingProcess({
                storeSelected: store,
                orderType,
                userAddress,
                resultEstimates,
              });
            } else if (
              country === "el-salvador" &&
              ((resultEstimates?.vehicleType && resultEstimates?.driver) ||
                (shipper_branch_id &&
                  resultEstimates?.message === "Success" &&
                  resultEstimates?.data?.service_name ===
                    "Same Day Service San Salvador"))
            ) {
              Actions.shoppingProcess({
                storeSelected: store,
                orderType,
                userAddress,
                resultEstimates: dataResultEstimates,
                country,
              });
            } else {
              await ryteSaturation(userAddress, store, user);
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
            setTimeout(() => {
              showAlert(
                "¡Lo sentimos!",
                "Ocurrió un problema inesperado, revisa tu conexión a Internet o inténtalo más tarde."
              );
            }, 500);
          }
        } else {
          Actions.shoppingProcess({
            storeSelected: store,
            orderType,
            userAddress,
          });
        }
      } else {
        setTimeout(() => {
          showAlert(
            "Lo sentimos",
            "Esta tienda no posee ninguno de los productos seleccionados."
          );
        }, 300);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        showAlert(
          "Error",
          "Ha ocurrido un error inesperado, inténteloo más tarde."
        );
      }, 300);
    }
    setLoading(false);
  };

  return (
    <View style={styles.root}>
      <View style={styles.storeNameContainer}>
        <Text style={styles.storeNameText}>{store.name}</Text>
      </View>
      <Container style={{ flex: 5.5 }}>
        <Tabs tabBarUnderlineStyle={styles.tabSelectedColor}>
          <Tab
            heading={
              <TabHeading style={styles.tabColor}>
                <Text style={styles.tabText}>Disponibilidad</Text>
              </TabHeading>
            }
          >
            <View style={[styles.root, { padding: 10 }]}>
              <View style={styles.storeProductsListContainer}>
                <Text style={styles.storeProductsListText}>
                  Lista de productos
                </Text>
              </View>
              <ContainerList
                data={cartFiltered}
                pressedListItem={() => {}}
                source="selectedStore"
              />
              {productsNotAvailable && (
                <View style={styles.productsNotAvailableView}>
                  <Text style={styles.productsNotAvailableText}>
                    Los productos agotados serán removidos del carrito de
                    compras
                  </Text>
                </View>
              )}
              <Button
                title={
                  <Text style={{ fontSize: 18 }}>Continuar con el pedido</Text>
                }
                height={60}
                borderRadius={0}
                marginTop={15}
                event={async () => removeUnavailableItems()}
                background={THEME.pronto.green}
                disabled={false}
              />
            </View>
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.tabColor}>
                <Text style={styles.tabText}>Mapa</Text>
              </TabHeading>
            }
          >
            <Map
              {...state}
              width={width}
              height={height * 0.9}
              pinColor={THEME.pronto.yellow}
              setStates={setStates}
              MAP_REF={MAP_REF}
              getMapRef={getMapRef}
              getMarkerRef={getMarkerRef}
              changeStateStoreNearby={changeStateStoreNearby}
            />
          </Tab>
        </Tabs>
      </Container>
      <Spinner visible={loading} />
    </View>
  );
};
const configStores = {
  showHeader: true,
  showShoppingCart: false,
  showSideMenu: false,
};
export default wrappedView(SelectedStore, configStores);
