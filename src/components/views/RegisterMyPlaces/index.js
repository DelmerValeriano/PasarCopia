import React, { useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import { Spinner } from "../../molecules";
import { getIdToken } from "./../../../commons/user";
import { insertMyPlace } from "./../../../commons/services/myPlaces";
import { ShippingInformationForm } from "../../molecules";
import { Button } from "./../../atoms";
import { validateRegisterMyPlaceForm } from "./../../../commons/formValidations";
import wrappedView from "./../../../WrappedView";
import { THEME } from "../../../styles";
import styles from "./styles";

const RegisterMyPlaces = ({
  title = "Información de envío",
  showAlert,
  callBack,
  marker,
}) => {
  const [disabledItems, setDisabledItems] = useState({
    fullAddrress: false,
  });

  const [myPlaceDetail, setMyPlaceDetail] = useState({
    places: {
      myPlace: {
        fullAddrress: null,
        addressType: null,
      },
    },
  });
  const [isLoading, setIsLoaing] = useState(false);

  const [typePlaces, setTypePlaces] = useState(null);

  const updateFormData = (values) => {
    myPlaceDetail.places = values;
    setMyPlaceDetail(myPlaceDetail);
  };

  const updateAddressType = (id) => {
    if (id !== null) {
      myPlaceDetail.places.myPlace.addressType = null;
      myPlaceDetail.places.myPlace.fullAddrress = null;
      setTypePlaces(id);
      updateFormData(myPlaceDetail.places);
      myPlaceDetail.places.myPlace.addressType = id;
      updateFormData(myPlaceDetail.places);
    }
  };

  const updaterFullAddrress = (address) => {
    myPlaceDetail.places.myPlace.fullAddrress = null;
    updateFormData(myPlaceDetail.places);
    myPlaceDetail.places.myPlace.fullAddrress = address;
    updateFormData(myPlaceDetail.places);
  };

  const addNewPlace = async () => {
    try {
      setIsLoaing(true);
      myPlaceDetail.places.myPlace.coordinates = marker;
      let res = await insertMyPlace(
        await getIdToken(),
        myPlaceDetail.places.myPlace
      );

      if (res.success) {
        setTimeout(async () => {
          await callBack({
            id: null, //Brayan: Este ID debe venir del servicio web
            addressType: myPlaceDetail.places.myPlace.addressType,
            fullAddress: myPlaceDetail.places.myPlace.fullAddrress,
            coordinates: myPlaceDetail.places.myPlace.coordinates,
          });
          setIsLoaing(false);
        }, 100);
      } else {
        setIsLoaing(false);
        showAlert("Error", `${res.message}`);
      }
    } catch (error) {
      showAlert(
        "Error",
        "Ha ocurrido un error inesperado, inténtelo más tarde."
      );
    }
  };

  const addMyPlace = async () => {
    const message = validateRegisterMyPlaceForm(myPlaceDetail.places);
    if (message) {
      showAlert("Importante", message);
    } else {
      Alert.alert(
        "Confirmar",
        "¿Desea registrar esta dirección?",
        [
          {
            text: "Cancelar",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              addNewPlace();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.container}>
        <ShippingInformationForm
          updaterFullAddrress={updaterFullAddrress}
          title={title}
          fullAddrressValue={myPlaceDetail.places.myPlace.fullAddrress}
          updateAddressType={updateAddressType}
          typePlaces={typePlaces}
          {...disabledItems}
        />
      </ScrollView>
      <Button
        title="Registrar dirección"
        height={60}
        disabled={isLoading}
        borderRadius={0}
        marginTop={0}
        event={addMyPlace}
        background={THEME.pronto.green}
      />
      <Spinner visible={isLoading} label="Registrando..." />
    </View>
  );
};
const RegisterMyPlacesConfigView = {
  showHeader: true,
  showShoppingCart: true,
  isForm: true,
};

export default wrappedView(RegisterMyPlaces, RegisterMyPlacesConfigView);
