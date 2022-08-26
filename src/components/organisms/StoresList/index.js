import React, { useState, useEffect } from "react";
import { ContainerList } from "../../molecules";
import { Actions } from "react-native-router-flux";
import { Input } from "../../atoms";
import { View, Text } from "react-native";
import { StoresFilter } from "../../molecules";
import { filterItemsByAtributes } from "../../../commons/filters";
import styles from "./styles";

const StoresList = ({
  stores,
  pressedListItem,
  action,
  source,
  products,
  loading,
  refreshing,
  handleRetrieveMoreStoresList,
  handleItem,
}) => {
  const [stateStores, setStateStores] = useState({
    itemsFilters: [],
    textValue: "",
  });

  useEffect(() => {
    setStateStores((prevState) => ({ ...prevState, itemsFilters: stores }));
  }, [stores]);

  const openSearchProductsModal = () => {
    Actions.searchStores({ pressedListItem, source, products, action });
  };

  const onChangeInputSearch = (value) => {
    setStateStores((prevState) => ({ ...prevState, textValue: value }));

    if (value !== "") {
      setStateStores((prevState) => ({
        ...prevState,
        itemsFilters: filterItemsByAtributes(stores, value, ["name"]),
      }));
    } else {
      setStateStores((prevState) => ({
        ...prevState,
        itemsFilters: stores,
      }));
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        {source === "pick" || source === "delivery" ? (
          <Input
            placeholder="Buscar tienda"
            icon="magnify"
            onChange={onChangeInputSearch}
            value={stateStores.textValue}
          />
        ) : (
          <StoresFilter onPressInput={openSearchProductsModal} />
        )}
      </View>
      {source === "pick" ||
        (source === "delivery" && (
          <View style={{ paddingRight: 20 }}>
            <Text style={styles.availability}>Disponibilidad</Text>
          </View>
        ))}
      <ContainerList
        data={stateStores.itemsFilters}
        pressedListItem={pressedListItem}
        action={action}
        source={source}
        products={products}
        keyExtractor={(item) => item.id.toString()}
        loading={loading}
        refreshing={refreshing}
        handleRetrieveMoreStoresList={handleRetrieveMoreStoresList}
        handleItem={handleItem}
      />
    </View>
  );
};

export default StoresList;
