import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { TerritoriesList } from "../../organisms";
import { Spinner } from "../../molecules";
import {
  getAllZones,
  getLocalUserCountry,
  getLocalUserZone,
  setLocalUserZone,
  getAllCategoriesItems,
  getCartLength,
  emptyCart,
} from "../../../commons/localstorage";
const LogoImage = require("../../../imgs/logos/pronto-logo.png");
import { getUserZone } from "../../../commons/helpers/formatCurrency";
import styles from "./styles";

const TerritorySelect = () => {
  const [spinner, setSpinner] = useState(true);
  const [states, setStates] = useState([]);

  useEffect(() => {
    handleGetState();
  }, []);

  const handleGetState = async () => {
    const userCountry = await getLocalUserCountry();
    const dataZones = await getAllZones(userCountry);

    if (dataZones) {
      setStates(dataZones);
      setSpinner(false);
    }
  };
  const restartCountry = async (zone, cartLength) => {
    if (cartLength) {
      await emptyCart();
    }

    setSpinner(true);
    const userCountry = await getLocalUserCountry();
    await setLocalUserZone(zone);
    await getUserZone();
    await getAllCategoriesItems(userCountry, zone);
    setSpinner(false);

    Actions.reset("root");
  };

  const getZoneInfo = async ({ territory }) => {
    const zone = await getLocalUserZone();

    const length = await getCartLength();
    if (territory?.id !== zone?.id && length) {
      Alert.alert(
        "Confirmar",
        "Al cambiar de territorio se eliminará su carrito.\n\n¿Desea continuar?",
        [
          {
            text: "Cancelar",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              await restartCountry(territory, length);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      await restartCountry(territory);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentRoot}
    >
      <View style={styles.root}>
        <View style={styles.header}>
          <Image source={LogoImage} style={styles.imageHeader} />
        </View>
        <View style={styles.countriesContainer}>
          <TerritoriesList submit={getZoneInfo} states={states} />
        </View>
        <Spinner visible={spinner} label="" />
      </View>
    </ScrollView>
  );
};

export default TerritorySelect;
