import React, { useState, useContext } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { CountriesList } from "../../organisms";
import { Spinner } from "../../molecules";
import {
  removeZones,
  getCartLength,
  emptyCart,
  setLocalUserCountry,
  setLocalUserZone,
} from "../../../commons/localstorage";
import { getCountriesZonesActive } from "../../../commons/services";
const LogoImage = require("../../../imgs/logos/pronto-logo.png");
import { getUserCountry } from "../../../commons/helpers/formatCurrency";
import { countryContext } from "../../../contexts/countryProvider";
import styles from "./styles";

const CountrySelect = ({ initialCountry, behavior }) => {
  const [spinner, setSpinner] = useState(false);
  const { getCountry } = useContext(countryContext);

  const restartCountry = async (country, cartLength) => {
    setSpinner(true);

    let countriesActiveZones = await getCountriesZonesActive(country);
    if (cartLength) {
      await emptyCart();
    }

    setLocalUserZone(null);
    await setLocalUserCountry(country);
    await getCountry();
    // await getAllCarouselItems(country);
    await getUserCountry();
    setSpinner(false);
    if (countriesActiveZones.active) {
      Actions.reset("territorySelect");
    } else {
      Actions.reset("root");
    }
  };

  const getCountryInfo = async ({ country }) => {
    const length = await getCartLength();
    if (country !== initialCountry && length) {
      Alert.alert(
        "Confirmar",
        "Al cambiar de país se eliminará su carrito.\n\n¿Desea continuar?",
        [
          {
            text: "Cancelar",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              await restartCountry(country, length);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      await restartCountry(country);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentRoot}
    >
      <View style={styles.root}>
        <View style={styles.header}>
          {behavior === "select" ? null : (
            <Text style={styles.welcomeText}>BIENVENIDO A</Text>
          )}
          <Image source={LogoImage} style={styles.imageHeader} />
        </View>
        <View style={styles.countriesContainer}>
          <CountriesList
            submit={getCountryInfo}
            initialCountry={initialCountry ? initialCountry : "honduras"}
            behavior={behavior}
          />
        </View>
        <Spinner visible={spinner} label="" />
      </View>
    </ScrollView>
  );
};

export default CountrySelect;
