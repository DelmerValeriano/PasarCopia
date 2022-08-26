import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Tab, Tabs, TabHeading, Text } from "native-base";
import { getStoresAll, stores, getAZone } from "../../../hooks/firebase";
import { Map } from "../../molecules";
import { StoresList } from "../../organisms";
import wrappedView from "../../../WrappedView";
import { limitStoresRequest } from "../../../commons/consts/consts";
import styles from "./styles";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const latDeltaInitial = ASPECT_RATIO * 0.355;

let MAP_REF = null;
let MARKER_REF = {};
const StoresView = () => {
  const [state, setState] = useState({
    region: {
      latitude: 15.199999,
      longitude: -86.241905,
      latitudeDelta: latDeltaInitial,
      longitudeDelta: latDeltaInitial / 2,
    },
    myLocation: {},
    storeNearby: {},
    stores: [],
    geolocationReady: false,
  });
  const [tabPage, setTabPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [dataStores, setDataStores] = useState({
    products: [],
    isLoading: false,
    lastLoadLength: null,
  });
  const [item, setItem] = useState({});

  useEffect(() => {
    setDataStores((prevState) => ({ ...prevState, isLoading: true }));
    getStores();
    getData(true);
  }, []);

  const getData = async (value) => {
    const productsList = await stores(value, item.name);
    setDataStores((prevState) => ({
      ...prevState,
      products: dataStores.products.concat(productsList),
      isLoading: false,
      lastLoadLength: productsList.length,
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

  const getStores = async () => {
    try {
      const stores = await getStoresAll();
      const zone = await getAZone();

      let { latitude, longitude } = zone;

      if (stores) {
        setState((prevState) => ({
          ...prevState,
          stores,
          region: {
            latitude,
            longitude,
            latitudeDelta: latDeltaInitial,
            longitudeDelta: latDeltaInitial / 2,
          },
        }));
      }
    } catch (error) {}

    setLoading(false);
  };

  const handleLoadMore = () => {
    if (
      dataStores.lastLoadLength === null ||
      dataStores.lastLoadLength === limitStoresRequest
    ) {
      setDataStores((prevState) => ({ ...prevState, isLoading: true }));
      getData(true);
    }
  };

  const setStates = (changeState) => {
    const { geolocationReady, region } = changeState;
    if (geolocationReady || !geolocationReady) {
      setState((prevState) => ({
        ...prevState,
        region,
        geolocationReady,
      }));
    } else {
      setState((prevState) => ({ ...prevState, region }));
    }
  };

  const changeStateStoreNearby = (myLocation, storeNearby) => {
    setState((prevState) => ({ ...prevState, myLocation, storeNearby }));
  };

  const onChangeTab = ({ i }) => {
    setTabPage(i);
  };

  const goToStore = (coordinates, id, store) => {
    Actions.storeDetails({ store });
  };

  const handleItem = (item) => {
    setItem(item);
  };

  return (
    <Container>
      <Tabs
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        page={tabPage}
        onChangeTab={onChangeTab}
      >
        <Tab
          heading={
            <TabHeading style={styles.tabStyle}>
              <Text style={styles.textStyle}>Mapa</Text>
            </TabHeading>
          }
        >
          {loading ? (
            <ActivityIndicator
              size={Platform.OS === "ios" ? "small" : "large"}
            />
          ) : (
            <Map
              {...state}
              width={width}
              height={height * 0.9}
              setStates={setStates}
              MAP_REF={MAP_REF}
              getMapRef={getMapRef}
              getMarkerRef={getMarkerRef}
              changeStateStoreNearby={changeStateStoreNearby}
            />
          )}
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tabStyle}>
              <Text style={styles.textStyle}>Lista</Text>
            </TabHeading>
          }
        >
          <StoresList
            stores={dataStores.products}
            loading={dataStores.isLoading}
            refreshing={state.refreshingStoresList}
            pressedListItem={goToStore}
            handleRetrieveMoreStoresList={handleLoadMore}
            handleItem={handleItem}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

const configStores = {
  showHeader: true,
  showShoppingCart: true,
};

export default wrappedView(StoresView, configStores);
