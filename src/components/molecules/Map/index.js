import React, { useState, useEffect } from "react";
import { View, Dimensions, Platform, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Geojson } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from "react-native-permissions";
import { showAlert } from "../../../commons/notifications";
import { ButtonFab } from "../../molecules";
import { MapMarker, RoundedButton } from "../../atoms";
import { THEME } from "../../../styles";
import { getStoreNearby } from "../../../commons/services/stores";
import styles from "./styles";
import { getDeliveryProviders } from "./../../../hooks/firebase";

const GOOGLE_MAPS_APIKEY = "AIzaSyAfVCmHotinOylDDxg5awKgcL7BwdvMHzs";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const configGeolocation = {
  enableHighAccuracy: false,
  timeout: 20000,
  maximumAge: 1000,
};
// Acercamiento
const latDelta = ASPECT_RATIO * 0.015;
const longDelta = latDelta / 2;
let coordsStoresNearby = null;

const ViewMap = ({
  region,
  myLocation,
  storeNearby,
  stores,
  geolocationReady,
  width,
  setStates,
  getMapRef,
  getMarkerRef,
  MAP_REF,
  changeStateStoreNearby,
}) => {
  const [stateMap, setStateMap] = useState({
    active: false,
    showTraffic: false,
    showStoreNearby: storeNearby ? true : false,
    mapType: "hybrid",
    activeMapType: false,
    activeBtnColor1: !storeNearby ? THEME.whiteColor : THEME.pronto.yellow,
    activeBtnColor2: THEME.pronto.yellow,
    activeBtnColor3: THEME.pronto.yellow,
    btnBackgroundColor1: !storeNearby ? THEME.pronto.yellow : THEME.whiteColor,
    btnBackgroundColor2: THEME.whiteColor,
    btnBackgroundColor3: THEME.whiteColor,
  });

  const [zones, setZones] = useState({ isLoading: true, coverageAreas: [] });

  const getZonesItems = async () => {
    setZones((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    let items = await getDeliveryProviders();
    setZones((prevState) => ({
      ...prevState,
      coverageAreas: items.length ? JSON.parse(items[0]) : [],
      isLoading: false,
    }));
  };

  useEffect(() => {
    getZonesItems();
  }, []);

  useEffect(() => {
    if (storeNearby) {
      coordsStoresNearby = storeNearby;
    }
  }, [storeNearby]);

  const dataButtons = [
    {
      id: "button-1",
      icon: <Icon name="car" size={20} color={stateMap.activeBtnColor3} />,
      event: () => changeStatesMapTraffic(),
      backgroundColor: stateMap.btnBackgroundColor3,
    },
    {
      id: "button-2",
      icon: <Icon name="map" size={20} color={stateMap.activeBtnColor2} />,
      event: () => changeStatesMapType(),
      backgroundColor: stateMap.btnBackgroundColor2,
    },
    {
      id: "button-3",
      icon: <Icon name="flag" size={20} color={stateMap.activeBtnColor1} />,
      event: () => showNearestStore(),
      backgroundColor: stateMap.btnBackgroundColor1,
    },
  ];

  const colorExchange = (activator) => {
    return activator ? THEME.whiteColor : THEME.pronto.yellow;
  };

  const getMapType = (mapType) => {
    return mapType ? "standard" : "hybrid";
  };

  const changeStatesMapTraffic = () => {
    setStateMap((prevState) => ({
      ...prevState,
      showTraffic: !stateMap.showTraffic,
      activeBtnColor3: colorExchange(!stateMap.showTraffic),
      btnBackgroundColor3: colorExchange(stateMap.showTraffic),
    }));
  };

  const changeStatesMapType = () => {
    setStateMap((prevState) => ({
      ...prevState,
      mapType: getMapType(!stateMap.activeMapType),
      activeBtnColor2: colorExchange(!stateMap.activeMapType),
      btnBackgroundColor2: colorExchange(stateMap.activeMapType),
      activeMapType: !stateMap.activeMapType,
    }));
  };

  const showNearestStore = () => {
    if (storeNearby.latitude !== undefined && !stateMap.showStoreNearby) {
      setStateMap((prevState) => ({
        ...prevState,
        showStoreNearby: !stateMap.showStoreNearby,
        activeBtnColor1: colorExchange(!stateMap.showStoreNearby),
        btnBackgroundColor1: colorExchange(stateMap.showStoreNearby),
      }));
      onPressMarker(coordsStoresNearby);
    } else if (storeNearby.latitude === undefined) {
      Alert.alert(
        "Atención",
        "Si la ubicación esta habilitada, presione aceptar para encontrar su pronto más cercano.",
        [
          {
            text: "Cancelar",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: () => getCurrentPosition("storeNearby"),
          },
        ],
        { cancelable: false }
      );
    } else {
      setStateMap((prevState) => ({
        ...prevState,
        showStoreNearby: !stateMap.showStoreNearby,
        activeBtnColor1: colorExchange(!stateMap.showStoreNearby),
        btnBackgroundColor1: colorExchange(stateMap.showStoreNearby),
      }));
    }
  };

  const openSettingsDevice = () => {
    Alert.alert(
      "Importante",
      "No podemos localizarlo, habilite el acceso a su ubicación.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
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
        setStates({ geolocationReady: false, region });
        showAlert(
          "Importante",
          "No podemos localizarlo, activa la ubicación o presione nuevamente la geolocalización."
        );
      }
    } catch (error) {}
  };

  const getCurrentPosition = async (argument) => {
    setStates({ geolocationReady: true, region });
    Geolocation.getCurrentPosition(
      (position) => geoSuccess(position, argument),
      getPermissionToLocation,
      configGeolocation
    );
  };

  const geoSuccess = async (position, argument) => {
    const { latitude, longitude } = position.coords;
    if (argument == "storeNearby") {
      let moreNearby = await getStoreNearby(latitude, longitude);
      if (moreNearby.success) {
        coordsStoresNearby = moreNearby.storeNearby.coordinates;
        onPressMarker(coordsStoresNearby);
        changeStateStoreNearby({ latitude, longitude }, coordsStoresNearby);
        setStateMap((prevState) => ({
          ...prevState,
          activeBtnColor1: colorExchange(true),
          btnBackgroundColor1: colorExchange(false),
        }));
      }
    }

    const myLocation = {
      latitude,
      longitude,
      latitudeDelta: latDelta,
      longitudeDelta: longDelta,
    };
    setTimeout(() => animationMap(myLocation, false), 2000);
  };

  const onPressMarker = (coordinate) => {
    const storeRegion = {
      ...coordinate,
      latitudeDelta: latDelta,
      longitudeDelta: longDelta,
    };
    animationMap(storeRegion, geolocationReady);
  };

  const animationMap = (newRegion, readyGeo) => {
    if (MAP_REF) {
      MAP_REF.animateToRegion(newRegion, 1000);
      setTimeout(
        () => setStates({ region: newRegion, geolocationReady: readyGeo }),
        2000
      );
    }
  };

  const onRegionChangeComplete = (newCoordinates) => {
    setStates({ geolocationReady, region: newCoordinates });
  };

  const eventActive = (value, field) => {
    setStateMap((prevState) => ({ ...prevState, [field]: value }));
  };

  const geojsonItems = () => {
    if (store !== undefined) {
      return (
        <Geojson
          geojson={JSON.parse(store.deliveryProviders[0].ref.geojson)}
          strokeColor={THEME.pronto.green}
          fillColor={THEME.pronto.green + "50"}
          strokeWidth={2}
        />
      );
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.buttonGeolocation}>
        <RoundedButton
          name={geolocationReady ? "refresh" : "crosshairs-gps"}
          color={THEME.pronto.yellow}
          event={() => getCurrentPosition("location")}
        />
      </View>
      <MapView
        ref={(ref) => getMapRef(ref)}
        style={{ width, height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        mapType={stateMap.mapType}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        showsTraffic={stateMap.showTraffic}
      >
        {/*  {stateMap.showStoreNearby && geojsonItems()} */}
        <MapMarker
          stores={stores}
          onPressMarker={onPressMarker}
          getMarkerRef={getMarkerRef}
        />

        {false &&
        zones.coverageAreas !== undefined &&
        zones.coverageAreas.features ? (
          <Geojson
            geojson={zones.coverageAreas}
            strokeColor={THEME.pronto.green}
            fillColor={THEME.pronto.green + "50"}
            strokeWidth={2}
          />
        ) : null}
      </MapView>
      <View style={styles.buttonOptionsMap}>
        <ButtonFab
          {...stateMap}
          name="dots-vertical"
          options={dataButtons}
          color={THEME.pronto.yellow}
          backgroundColor={THEME.whiteColor}
          eventActive={eventActive}
        />
      </View>
    </View>
  );
};

export default ViewMap;
