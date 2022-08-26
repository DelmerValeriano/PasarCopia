import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Spinner } from "../../molecules";
import wrappedView from "./../../../WrappedView";
import { CardMyPlace } from "../../molecules";
import { Button } from "../../atoms";
import { getIdToken } from "./../../../commons/user";
import {
  getAllMyPlaces,
  deleteMyPlace,
} from "./../../../commons/services/myPlaces";
import { THEME } from "../../../styles";
import styles from "./styles";

const MyPlaces = ({ action, goTo = "myPlaces", showAlert, orderType }) => {
  const [isLoading, setIsLoadin] = useState(false);
  const [showOverlaySpinner, setShowOverlaySpinner] = useState(false);
  const [myPlaces, setMyPlaces] = useState([]);

  useEffect(() => {
    itemsMyPlaces();
  }, [isLoading]);

  const itemsMyPlaces = async () => {
    const itemsMyPlaces = await getAllMyPlaces(await getIdToken());
    setIsLoadin(true);
    setMyPlaces(itemsMyPlaces.myPlaces);
  };

  const resolveNewPlace = async () => {
    const allPlaces = await getAllMyPlaces(await getIdToken());

    if (action) {
      if (orderType) Actions.pop();

      action(allPlaces.myPlaces[allPlaces.myPlaces.length - 1]);
    }
    setMyPlaces(allPlaces.myPlaces);
    if (!orderType) Actions.popTo(goTo);
  };

  const deletePlace = async (idsMyPlace, index) => {
    setShowOverlaySpinner(true);
    try {
      let res = await deleteMyPlace(await getIdToken(), idsMyPlace);
      setShowOverlaySpinner(false);
      if (res.success === true) {
        let items = myPlaces;
        setMyPlaces([]);
        items.splice(index, 1);
        setMyPlaces(items);
      } else {
        setTimeout(() => {
          showAlert(`${res.errorTitle}`, `${res.errorMessage}`);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => showAlert("Error", "Conexión limitada o nula"), 1000);
    } finally {
      setShowOverlaySpinner(false);
    }
  };

  const getPlaceById = (idPlace) => {
    return myPlaces.filter((place) => {
      return place.id === idPlace;
    })[0];
  };

  const selectPlace = (idPlace) => {
    action(getPlaceById(idPlace));
    if (!orderType) Actions.pop();
  };

  const openRegisterPlace = () => {
    Actions.MapPlaces({ callBack: resolveNewPlace });
  };

  const Places = () => {
    if (myPlaces.length > 0) {
      return myPlaces.map((place, index) => (
        <CardMyPlace
          key={index}
          index={index}
          deleteMyPlace={!action && deletePlace}
          {...place}
          event={selectPlace}
          disabled={action ? false : true}
        />
      ));
    } else {
      return (
        <Text style={{ textAlign: "center" }}>
          No tienes direcciones agregadas
        </Text>
      );
    }
  };

  return (
    <View style={styles.root}>
      {!isLoading && (
        <ActivityIndicator size={Platform.OS === "ios" ? "small" : "large"} />
      )}
      <ScrollView>{isLoading && <Places />}</ScrollView>
      <Button
        title="Registrar nueva dirección"
        height={60}
        borderRadius={0}
        marginTop={0}
        event={openRegisterPlace}
        background={THEME.pronto.green}
      />
      <Spinner visible={showOverlaySpinner} label="Registrando..." />
    </View>
  );
};

const MyPlacesConfigView = {
  showHeader: true,
  showShoppingCart: true,
};

export default wrappedView(MyPlaces, MyPlacesConfigView);
