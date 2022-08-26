import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ActionSheet } from "native-base";
import { ProductsFilter } from "../../molecules";
import { FilteredProducts } from "../../organisms";
import wrappedView from "../../../WrappedView";
import { textFormat } from "./../../../static/products";
import {
  optionsActionSheet,
  limitProductsRequest,
} from "./../../../commons/consts/consts";
import styles from "./styles";
import {
  getSearchProduct,
  getSortProductsByPrice,
  getProducts,
} from "../../../commons/services/products";
import {
  getProductsByCategory,
  getProductsByCategoryOrder,
} from "../../../hooks/firebase";

const SearchModal = ({
  categoryId,
  productCategories,
  userCountry,
  onWillFocus,
  associatedCategory,
}) => {
  const [stateProducts, setStateProducts] = useState({
    itemsFilters: [],
    textValue: null,
    lastLoadLength: null,
    item: {},
  });
  const [orderTypes, setOrderType] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (orderTypes === null) {
      getProductsAll();
    } else {
      getDataOrder(orderTypes);
    }
  }, [orderTypes]);

  const getProductsAll = async () => {
    const productsListAll =
      userCountry === "honduras"
        ? await getProducts(categoryId, stateProducts.item?.name)
        : await getProductsByCategory(categoryId, stateProducts.item.name);

    if (productsListAll.success) {
      setStateProducts((prevState) => ({
        ...prevState,
        itemsFilters: stateProducts.itemsFilters.concat(productsListAll.data),
        lastLoadLength: productsListAll.data.length,
        textValue: null,
      }));
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getProductSearch = async (search) => {
    try {
      const dataProducts =
        userCountry === "honduras"
          ? await getSearchProduct(search, stateProducts.item.name)
          : await getProductsByCategory(null, stateProducts.item.name, search);

      if (
        dataProducts.success &&
        stateProducts.textValue !== null &&
        stateProducts.textValue === search
      ) {
        const { data } = dataProducts;

        setStateProducts((prevState) => ({
          ...prevState,
          itemsFilters: stateProducts.itemsFilters.concat(data),
          lastLoadLength: data.length,
        }));

        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChangeInputSearch = async (value) => {
    if (value !== "") {
      setLoading(true);
      stateProducts.itemsFilters = [];
      stateProducts.lastLoadLength = null;
      stateProducts.textValue = textFormat(value);
      stateProducts.item = {};
      setStateProducts(stateProducts);
      await getProductSearch(textFormat(value));
    } else {
      setLoading(true);
      stateProducts.itemsFilters = [];
      stateProducts.lastLoadLength = null;
      stateProducts.item = {};
      stateProducts.textValue = null;
      setStateProducts(stateProducts);
      getProductsAll();
    }
  };

  const getDataOrder = async (order) => {
    const productsListOrder =
      userCountry === "honduras"
        ? await getSortProductsByPrice(
            categoryId,
            order,
            stateProducts.textValue,
            stateProducts.item?.price
          )
        : await getProductsByCategoryOrder(
            categoryId,
            stateProducts.item?.price,
            order,
            stateProducts.textValue,
            null
          );

    getProductsByCategoryOrder;

    if (productsListOrder.success) {
      const { data } = productsListOrder;

      setStateProducts((prevState) => ({
        ...prevState,
        itemsFilters: stateProducts.itemsFilters.concat(data),
        lastLoadLength: data.length,
      }));

      setLoading(false);
    }
  };

  const orderProductsByPrice = () => {
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
      setLoading(false);
      stateProducts.itemsFilters = [];
      stateProducts.lastLoadLength = null;
      stateProducts.item = {};
      setStateProducts(stateProducts);
      setOrderType("asc");
    }
    if (index === 1 && orderTypes !== "desc") {
      setLoading(false);
      stateProducts.itemsFilters = [];
      stateProducts.lastLoadLength = null;
      stateProducts.item = {};
      setStateProducts(stateProducts);
      setOrderType("desc");
    }
  };

  const itemLimit = (value) => {
    stateProducts.item = value;
    setStateProducts(stateProducts);
  };

  const handleLoadMore = async () => {
    if (
      stateProducts.lastLoadLength === null ||
      stateProducts.lastLoadLength === limitProductsRequest
    ) {
      if (orderTypes === null) {
        setLoading(true);
        const { textValue } = stateProducts;

        if (textValue !== "" && textValue !== null && textValue !== undefined) {
          await getProductSearch(textValue);
        } else {
          getProductsAll();
        }
      } else {
        setLoading(true);
        getDataOrder(orderTypes);
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
      <View style={styles.row}>
        <ProductsFilter
          onChangeInputValue={onChangeInputSearch}
          onPresButton={orderProductsByPrice}
        />
      </View>
      <FilteredProducts
        renderFooter={renderFooter}
        handleLoadMore={handleLoadMore}
        event={itemLimit}
        productsState={stateProducts}
        categories={productCategories}
        emptyList={emptyList}
        userCountry={userCountry}
        onWillFocus={onWillFocus}
        isLoading={isLoading}
        associatedCategory={associatedCategory}
        id={categoryId}
      />
    </View>
  );
};
const configSearchModal = {
  showHeader: true,
  showShoppingCart: true,
};

export default wrappedView(SearchModal, configSearchModal);
