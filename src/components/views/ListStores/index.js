import React, { useState, useEffect } from "react";
import { Container } from "native-base";
import { stores } from "../../../hooks/firebase";
import { Spinner } from "../../molecules";
import { StoresList } from "../../organisms";
import wrappedView from "../../../WrappedView";
import { limitStoresRequest } from "../../../commons/consts/consts";

const ListStores = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [dataStores, setDataStores] = useState({
    products: [],
    isLoading: false,
    lastLoadLength: null,
  });
  const [itemList, setItemList] = useState({});

  useEffect(() => {
    setDataStores((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    getData(true);
  }, []);

  const getData = async (value) => {
    const productsList = await stores(value, itemList.name);
    const ArrayStores = dataStores.products.concat(productsList);

    if (ArrayStores[0].id !== "0") {
      ArrayStores.unshift({
        id: "0",
        name: "Ninguna tienda en específico",
        email: "prontoapp@yourappland.com",
        address: "Ninguna tienda en específico",
        phone: "Ninguna tienda en específico",
      });
    }

    setDataStores((prevState) => ({
      ...prevState,
      products: ArrayStores,
      isLoading: false,
      lastLoadLength: productsList.length,
    }));
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (
      dataStores.lastLoadLength === null ||
      dataStores.lastLoadLength === limitStoresRequest
    ) {
      setDataStores((prevState) => ({ ...prevState, isLoading: true }));
      getData(true);
    }
  };

  const handleItem = (item) => {
    setItemList(item);
  };

  return (
    <>
      <Container>
        <StoresList
          action={item}
          stores={dataStores.products}
          loading={dataStores.isLoading}
          handleRetrieveMoreStoresList={handleLoadMore}
          handleItem={handleItem}
        />
      </Container>
      <Spinner visible={loading} />
    </>
  );
};

const configListStores = {
  showHeader: true,
};

export default wrappedView(ListStores, configListStores);
