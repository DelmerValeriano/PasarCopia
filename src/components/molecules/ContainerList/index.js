import React from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { MiniCard } from "../../atoms";

const ContainerList = ({
  data,
  pressedListItem,
  action,
  source,
  products,
  loading,
  handleRetrieveMoreStoresList,
  handleItem,
}) => {
  const renderItem = ({ item }) => {
    if (handleItem !== null && handleItem !== undefined) handleItem(item);
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

  const renderFooter = () => {
    return loading ? (
      <View>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      refreshing={false}
      onEndReachedThreshold={0.0001}
      onEndReached={handleRetrieveMoreStoresList}
    />
  );
};

export default ContainerList;
