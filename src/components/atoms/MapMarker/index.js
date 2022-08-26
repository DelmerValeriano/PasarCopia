import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../../../styles";
import { IconMarker } from "../index";
import { ItemsServicesText } from "../../molecules";
import styles from "./styles";

const MapMarker = ({ stores, onPressMarker, getMarkerRef }) => {
  const iconColor = THEME.pronto.blue;
  const iconSize = 16;
  const [dataStores, setDataStores] = useState([]);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  useEffect(() => {
    if (stores) {
      setDataStores(stores);
      setTimeout(() => {
        setTracksViewChanges(false);
      }, 3000);
    }
  }, [stores]);

  return (
    <>
      {dataStores.map((store, index) => {
        if (store?.coordinates?.latitude && store?.coordinates?.longitude) {
          return (
            <Marker
              ref={(ref) => getMarkerRef(ref, store.id)}
              key={index}
              coordinate={store.coordinates}
              tracksViewChanges={tracksViewChanges}
              tracksInfoWindowChanges={false}
              onPress={() => onPressMarker(store.coordinates)}
            >
              <IconMarker />
              <Callout tooltip={true}>
                <View style={styles.contentCallout}>
                  <View style={styles.contentTitle}>
                    <Text style={styles.textTitle}>{store.name}</Text>
                  </View>
                  <View style={styles.contentDescription}>
                    <View style={styles.row}>
                      <Icon name="ios-call" size={iconSize} color={iconColor} />
                      <Text style={styles.text}>{store.phone}</Text>
                    </View>

                    <View style={styles.row}>
                      <Icon
                        name="md-compass"
                        size={iconSize}
                        color={iconColor}
                      />
                      <Text style={styles.text}>{store.address}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.text}>SERVICIOS:</Text>
                    </View>
                    <ItemsServicesText item={store.services} />
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        }
        return null;
      })}
    </>
  );
};

export default MapMarker;
