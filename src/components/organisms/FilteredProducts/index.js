import React from "react";
import { Actions } from "react-native-router-flux";
import { FlatList, View } from "react-native";
import { ProductCard } from "../../molecules";
import styles from "./styles";

const FilteredProducts = ({
  productsState,
  categories,
  emptyList,
  event,
  handleLoadMore,
  renderFooter,
  userCountry,
  onWillFocus,
  isLoading,
  associatedCategory,
  id,
}) => {
  const renderItem = ({ item }) => {
    event(item);
    return (
      <View style={styles.itemContainer}>
        <ProductCard
          {...item}
          event={openProduct}
          product={item}
          userCountry={userCountry}
          onWillFocus={onWillFocus}
        />
      </View>
    );
  };

  const openProduct = (product) => {
    Actions.productDetails({
      product: null,
      categories,
      idItem: product.id,
      id,
      associatedType: associatedCategory,
    });
  };

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={styles.flatListContent}
      numColumns={3}
      data={productsState.itemsFilters}
      ListEmptyComponent={!isLoading && emptyList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={0.0001}
      onEndReached={handleLoadMore}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={styles.flatListFooter}
      refreshing={false}
      showsVerticalScrollIndicator={false}
      onWillFocus={onWillFocus}
    />
  );
};
export default FilteredProducts;
