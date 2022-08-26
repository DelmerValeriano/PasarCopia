import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from "react-native-permissions";
import MapView, { Marker, Geojson } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import wrappedView from "../../../WrappedView";
import { Button, RoundedButton } from "../../atoms";
import { Actions } from "react-native-router-flux";
import { coodinatesValidations } from "../../../commons/coordinateValidations";
import { getDeliveryProviders, getAZone } from "./../../../hooks/firebase";
import { THEME } from "../../../styles";
import styles from "./styles";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const latDeltaInitial = ASPECT_RATIO * 0.355;

const MapPlaces = ({ showAlert, callBack }) => {
  const [mapRef, setMapRef] = useState(null);
  const [marker, setMarker] = useState(null);
  const [state, setState] = useState({
    region: {
      latitude: 15.199999,
      longitude: -86.241905,
      latitudeDelta: latDeltaInitial,
      longitudeDelta: latDeltaInitial / 2,
    },
    coverageAreas: undefined,
    isLoading: true,
  });
  const [valuePoint, setValuePoint] = useState(false);
  const [locationMarker, setLocationMarker] = useState(null);

  useEffect(() => {
    getCurrentPosition();
    getZonesItems();
  }, []);

  const getZonesItems = async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    let items = await getDeliveryProviders();
    const zone = await getAZone();
    const { latitude, longitude } = zone;

    setState((prevState) => ({
      ...prevState,
      coverageAreas: items.length ? JSON.parse(items[0]) : [],
      isLoading: false,
      region: {
        latitude,
        longitude,
        latitudeDelta: latDeltaInitial,
        longitudeDelta: latDeltaInitial / 2,
      },
    }));
  };

  const coordinatePress = async (e) => {
    const { coordinate } = await e.nativeEvent;
    setMarker(coordinate);
    setValuePoint(coodinatesValidations(coordinate, state.coverageAreas));
  };

  const openRegisterPlace = () => {
    if (valuePoint) {
      Actions.myPlacesRegister({ callBack, marker });
    } else {
      showAlert(
        "Importante",
        "Debe seleccionar un punto dentro de la zona de cobertura color verde. "
      );
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
  const configGeolocation = {
    enableHighAccuracy: false,
    timeout: 20000,
    maximumAge: 1000,
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
        showAlert(
          "Importante",
          "No podemos localizarlo, activa la ubicación o presione nuevamente la geolocalización."
        );
      }
    } catch (error) {}
  };
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      geoSuccess,
      getPermissionToLocation,
      configGeolocation
    );
  };
  const geoSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    let coordinate = {
      latitude,
      longitude,
    };

    if (state.coverageAreas) {
      setValuePoint(coodinatesValidations(coordinate, state.coverageAreas));
      mapRef.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: latDeltaInitial,
        longitudeDelta: latDeltaInitial / 2,
      });
    } else {
      setLocationMarker(coordinate);
    }
    setMarker(coordinate);
  };

  const animatedMapRef = (map) => {
    setMapRef(map);
    if (locationMarker) {
      const { latitude, longitude } = state.region;
      if (
        locationMarker.longitude !== longitude &&
        locationMarker.latitude !== latitude
      ) {
        state.region.latitude = locationMarker.latitude;
        state.region.longitude = locationMarker.longitude;
        setState(state);
        setValuePoint(
          coodinatesValidations(locationMarker, state.coverageAreas)
        );
      }
    }
  };

  return (
    <View style={styles.map}>
      {state.isLoading ? (
        <ActivityIndicator size={Platform.OS === "ios" ? "small" : "large"} />
      ) : (
        <>
          <View style={styles.buttonGeolocation}>
            <RoundedButton
              name={"crosshairs-gps"}
              color={THEME.pronto.yellow}
              event={getCurrentPosition}
            />
          </View>
          <MapView
            style={styles.root}
            ref={animatedMapRef}
            initialRegion={state.region}
            onPress={coordinatePress}
          >
            {marker && <Marker coordinate={marker} />}
            {state.coverageAreas !== undefined &&
            state.coverageAreas.features ? (
              <Geojson
                geojson={state.coverageAreas}
                strokeColor={THEME.pronto.green}
                fillColor={THEME.pronto.green + "50"}
                strokeWidth={2}
              />
            ) : null}
          </MapView>
          <View style={styles.direction}>
            <Button
              title="Continuar"
              height={60}
              borderRadius={0}
              marginTop={0}
              width={"100%"}
              event={openRegisterPlace}
              background={THEME.pronto.green}
            />
          </View>
        </>
      )}
    </View>
  );
};

const MapPlacesConfigView = {
  showHeader: true,
  isForm: false,
};

export default wrappedView(MapPlaces, MapPlacesConfigView);
