import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { StoresFilter } from "../../molecules";
import wrappedView from "../../../WrappedView";
import { stores } from "../../../hooks/firebase";
import { textFormat } from "./../../../static/products";
import { FilteredStores } from "../../organisms";
import { limitStoresRequest } from "../../../commons/consts/consts";
import styles from "./styles";

const SearchModal = ({ pressedListItem, source, products, action }) => {
  const [dataStores, setdataStores] = useState({
    itemsFilters: [],
    textValue: null,
    lastLoadLength: null,
    item: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getStores(true);
  }, []);

  const getStores = async (value) => {
    const productsList = await stores(
      value,
      dataStores.item.name,
      dataStores.textValue
    );
    if (productsList) {
      setdataStores((prevState) => ({
        ...prevState,
        itemsFilters: dataStores.itemsFilters.concat(productsList),
        lastLoadLength: productsList.length,
      }));
      setIsLoading(false);
    }
  };

  const getFilterStores = async (value, textSearch) => {
    const productsList = await stores(
      value,
      dataStores.item.name,
      dataStores.textValue
    );

    if (productsList && textSearch === dataStores.textValue) {
      setdataStores((prevState) => ({
        ...prevState,
        itemsFilters: dataStores.itemsFilters.concat(productsList),
        lastLoadLength: productsList.length,
      }));
      setIsLoading(false);
    }
  };

  const onChangeInputSearch = async (value) => {
    if (value !== "") {
      dataStores.itemsFilters = [];
      dataStores.lastLoadLength = null;
      dataStores.isLoading = true;
      dataStores.textValue = textFormat(value);
      dataStores.item = {};
      setdataStores(dataStores);
      setIsLoading(true);
      await getFilterStores(false, textFormat(value));
    } else {
      dataStores.itemsFilters = [];
      dataStores.lastLoadLength = null;
      dataStores.isLoading = true;
      dataStores.item = {};
      setdataStores(dataStores);
      setIsLoading(true);
      await getStores(true);
    }
  };

  const itemLimit = (value) => {
    dataStores.item = value;
    setdataStores(dataStores);
  };

  const handleLoadMore = async () => {
    if (
      dataStores.lastLoadLength === null ||
      dataStores.lastLoadLength === limitStoresRequest
    ) {
      setIsLoading(true);
      if (dataStores.textValue === null) {
        getStores(true);
      } else {
        getStores(false);
      }
    }
  };

  const renderFooter = () => {
    return (
      isLoading && (
        <View>
          <ActivityIndicator size="large" />
        </View>
      )
    );
  };

  const emptyList = () => (
    <View style={styles.flatListEmpty}>
      <Text>No existen coincidencias.</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <StoresFilter onChangeInputValue={onChangeInputSearch} />
      </View>
      {source === "pick" ||
        (source === "delivery" && (
          <View style={{ paddingRight: 20 }}>
            <Text style={styles.availability}>Disponibilidad</Text>
          </View>
        ))}
      <FilteredStores
        renderFooter={renderFooter}
        handleLoadMore={handleLoadMore}
        event={itemLimit}
        productsState={dataStores}
        emptyList={emptyList}
        pressedListItem={pressedListItem}
        source={source}
        products={products}
        action={action}
        isLoading={isLoading}
      />
    </View>
  );
};
const configSearchModal = {
  showHeader: true,
  showShoppingCart: true,
};

export default wrappedView(SearchModal, configSearchModal);
