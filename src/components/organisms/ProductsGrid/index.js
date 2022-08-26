import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { ActionSheet } from "native-base";
import { getIdToken } from "../../../commons/user";
import { ProductCard, ProductsFilter } from "../../molecules";
import { getLocalUserZone } from "../../../commons/localstorage";
import {
  limitProductsRequest,
  optionsActionSheet,
} from "../../../commons/consts/consts";
import { Actions } from "react-native-router-flux";
import {
  getSortProductsByPrice,
  getProducts,
} from "../../../commons/services/products";
import {
  getProductsByCategory,
  getProductsByCategoryOrder,
} from "../../../hooks/firebase";
import styles from "./styles";

const ProductsGrid = ({
  id,
  categories,
  dataFavoritesList,
  emptyList,
  hideProductsFilter,
  onRefresh,
  onWillFocus,
  hideFavorites,
  userCountry,
  associatedCategory,
}) => {
  const [state, setState] = useState({
    products: [],
    isLoading: false,
    lastLoadLength: null,
  });
  const [item, setItem] = useState({});
  const [orderTypes, setOrderType] = useState("");

  useEffect(() => {
    if (orderTypes === "") {
      getData(id);
      setState((prevState) => ({ ...prevState, isLoading: true }));
    } else {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      getDataOrder(id, orderTypes);
    }
  }, [orderTypes]);

  const getData = async (id) => {
    const zone = await getLocalUserZone();
    const productsList = zone
      ? await getProducts(id, item?.name)
      : await getProductsByCategory(id, item?.name);

    if (productsList.success) {
      setState((prevState) => ({
        ...prevState,
        products: state.products.concat(productsList.data),
        isLoading: false,
        lastLoadLength: productsList.data.length,
      }));

      setItem(productsList.data[productsList.data.length - 1]);
    } else {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const getDataOrder = async (id, order) => {
    const productsListOrder1 =
      userCountry === "honduras"
        ? await getSortProductsByPrice(id, order, null, item?.price)
        : await getProductsByCategoryOrder(id, item?.price, order, null, null);

    if (productsListOrder1.success) {
      const { data } = productsListOrder1;
      setState((prevState) => ({
        ...prevState,
        products: state.products.concat(data),
        isLoading: false,
        lastLoadLength: data.length,
      }));
      setItem(data[data.length - 1]);
    }
  };

  const handleLoadMore = () => {
    if (
      state.lastLoadLength === null ||
      state.lastLoadLength === limitProductsRequest
    ) {
      if (orderTypes === "") {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        getData(id);
      } else {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        getDataOrder(id, orderTypes);
      }
    }
  };

  const orderProducts = () => {
    ActionSheet.show(
      {
        options: optionsActionSheet,
        cancelButtonIndex: 2,
        title:
          "Seleccione una opción para ordenar los productos por el precio ",
      },
      typeOrderProducts
    );
  };

  const typeOrderProducts = (index) => {
    if (index === 0 && orderTypes !== "asc") {
      setState((prevState) => ({
        ...prevState,
        products: [],
        isLoading: true,
      }));
      setItem({});
      setOrderType("asc");
    }
    if (index === 1 && orderTypes !== "desc") {
      setState((prevState) => ({
        ...prevState,
        products: [],
        isLoading: true,
      }));
      setItem({});
      setOrderType("desc");
    }
  };

  const renderFooter = () => {
    return (
      state.isLoading &&
      !dataFavoritesList && (
        <View>
          <ActivityIndicator size="large" />
        </View>
      )
    );
  };

  const openProduct = (product) => {
    if (hideFavorites) {
      Actions.pop();
    }

    Actions.productDetails({
      product: product,
      categories,
      idItem: product.id,
      id,
      associatedType: associatedCategory,
    });
  };

  const openSearchProductsModal = () => {
    Actions.searchProducts({
      categoryId: id,
      productCategories: categories,
      associatedCategory,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <ProductCard
        {...item}
        event={openProduct}
        product={item}
        onWillFocus={onWillFocus}
        key={index}
        userCountry={userCountry}
      />
    );
  };

  return (
    <View style={styles.root}>
      {!hideProductsFilter && (
        <View style={styles.filters}>
          <ProductsFilter
            onPressInput={openSearchProductsModal}
            onPresButton={orderProducts}
          />
        </View>
      )}
      <FlatList
        style={styles.flatList}
        data={dataFavoritesList ? dataFavoritesList : state.products}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        numColumns={3}
        ListEmptyComponent={!state.isLoading && emptyList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.0001}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={styles.flatListFooter}
        onRefresh={async () => onRefresh(await getIdToken())}
        refreshing={false}
      />
    </View>
  );
};

export default ProductsGrid;
