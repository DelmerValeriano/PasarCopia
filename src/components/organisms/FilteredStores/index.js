import React from "react";
import { FlatList } from "react-native";
import { MiniCard } from "../../atoms";
import styles from "./styles";

const FilteredProducts = ({
  productsState,
  emptyList,
  handleLoadMore,
  renderFooter,
  pressedListItem,
  source,
  products,
  action,
  event,
  isLoading,
}) => {
  const renderItem = ({ item }) => {
    event(item);
    return (
      <MiniCard
        item={{ ...item }}
        isStoreCard={true}
        event={pressedListItem}
        source={source}
        products={products}
        action={action}
      />
    );
  };

  return (
    <FlatList
      numColumns={1}
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
    />
  );
};
export default FilteredProducts;
