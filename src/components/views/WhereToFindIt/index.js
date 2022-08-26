import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { Map } from "../../molecules";
import wrappedView from "../../../WrappedView";
import { THEME } from "../../../styles";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
let MAP_REF = null;
let MARKER_REF = {};

const WhereToFindIt = ({ stores }) => {
  const [state, setState] = useState({
    stores,
    region: {
      latitude: 14.089564,
      longitude: -87.20257,
      latitudeDelta: ASPECT_RATIO,
      longitudeDelta: ASPECT_RATIO * 0.5,
    },
    myLocation: {},
    storeNearby: {},
  });

  const setStates = (changeState) => {
    setState((prevState) => ({ ...prevState, ...changeState }));
  };

  const getMapRef = (mapRef) => {
    MAP_REF = mapRef;
  };

  const getMarkerRef = (markerRef, storeId) => {
    if (MARKER_REF[storeId] == undefined) {
      MARKER_REF[storeId] = markerRef;
    }
  };

  const changeStateStoreNearby = (myLocation, storeNearby) => {
    setState((prevState) => ({ ...prevState, myLocation, storeNearby }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Map
        {...state}
        width={width}
        height={height * 0.9}
        pinColor={THEME.primary}
        setStates={setStates}
        MAP_REF={MAP_REF}
        getMapRef={getMapRef}
        getMarkerRef={getMarkerRef}
        changeStateStoreNearby={changeStateStoreNearby}
      />
    </View>
  );
};

const configWhereToFindIt = { showHeader: true };

export default wrappedView(WhereToFindIt, configWhereToFindIt);
