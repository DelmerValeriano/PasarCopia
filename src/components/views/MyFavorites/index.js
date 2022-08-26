import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, Platform } from "react-native";
import { NavigationEvents } from "react-navigation";
import { getUserFavoritesList } from "../../../commons/services/products";
import { getUid, getIdToken } from "../../../commons/user";
import { useCategoriesItems } from "../../../hooks/firebase";
import { ProductsGrid } from "../../organisms";
import wrappedView from "../../../WrappedView";
import styles from "./styles";
import { getLocalUserCountry } from "../../../commons/localstorage";

const MyFavorites = ({ showAlert }) => {
  const [state, setState] = useState({
    showEmptyList: false,
    spinnerVisible: false,
    categories: [],
    favoritesList: [],
  });
  const [country, setCountry] = useState({ value: "", error: "" });

  useEffect(() => {
    const fetchData = async () => {
      const userCountry = await getLocalUserCountry();
      setCountry({ value: userCountry, error: "" });
      country.value = userCountry;
    };
    fetchData();
  }, []);

  const getFavoritesList = async () => {
    setState((prevState) => ({
      ...prevState,
      spinnerVisible: state.favoritesList.length === 0,
    }));
    if (getUid()) {
      const data = await getUserFavoritesList(await getIdToken());
      const categories = await useCategoriesItems();
      if (data.success) {
        setState((prevState) => ({
          ...prevState,
          favoritesList: data.productsFavorites,
          categories,
          spinnerVisible: false,
          showEmptyList: data.productsFavorites.length ? false : true,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          spinnerVisible: false,
        }));
        showAlert(
          "Error",
          "Al obterner los datos, favor volver a intentar más tarde."
        );
      }
    }
  };

  const emptyList = () => (
    <View style={styles.flatListEmpty}>
      {!state.showEmptyList ? null : (
        <Text style={styles.textEmpty}>
          No hay productos en la lista de favoritos.
        </Text>
      )}
    </View>
  );

  const onWillFocus = () => {
    getFavoritesList();
  };

  const authResolve = () => {
    getFavoritesList();
  };

  return (
    <View style={styles.root}>
      {state.spinnerVisible ? (
        <ActivityIndicator size={Platform.OS === "ios" ? "small" : "large"} />
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.containerText}>
              <Text style={styles.text}>¿Qué estás buscando?</Text>
            </View>
          </View>

          <ProductsGrid
            dataFavoritesList={state.favoritesList}
            categories={state.categories}
            hideProductsFilter={true}
            onRefresh={getFavoritesList}
            emptyList={emptyList}
            hideFavorites={true}
          />
          <NavigationEvents onWillFocus={onWillFocus} />
        </>
      )}
    </View>
  );
};
const configMyFavorites = {
  showHeader: true,
  showShoppingCart: true,
};

export default wrappedView(MyFavorites, configMyFavorites);
