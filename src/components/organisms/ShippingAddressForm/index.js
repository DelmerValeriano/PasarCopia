import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Textarea } from "native-base";
import { ContactInformation } from "../../molecules";
import { Select } from "./../../atoms";
import { optionsTimeOfArrival } from "./../../../commons/consts/consts";
import { THEME } from "./../../../styles";
import { styles } from "./styles";
import {
  setNameLocal,
  setRtnLocal,
  setPhoneLocal,
  setNameRtnLocal,
  setNotesLocal,
  setTimeOfArrivalLocal,
} from "../../../commons/localstorage";

const ShippingAddressForm = ({
  subtitle = " Información de contacto",
  initialValues,
  updateFormData,
  userAddress,
  orderType,
  country,
}) => {
  useEffect(() => {
    if (userAddress) {
      itemsMyPlace(userAddress);
    }
  }, [userAddress]);

  const [disabledItemsPersons, setDisabledItemsPersons] = useState({
    disabledName: true,
    disabledPhone: true,
    disabledRtn: true,
    disabledNotes: true,
    disablednameRtn: true,
    disabledEmail: true,
    disabledTimeOfArrival: true,
  });

  const contactPersonName = async (name) => {
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledPhone: false,
    }));
    initialValues.shippingOwner.name = name;
    updateFormData(initialValues);
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledPhone: true,
    }));
    await setNameLocal(name);
  };
  const contactPersonPhone = async (phone) => {
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledPhone: false,
    }));
    initialValues.shippingOwner.phone = phone;
    updateFormData(initialValues);
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledPhone: true,
    }));
    await setPhoneLocal(phone);
  };

  const itemsMyPlace = (id) => {
    initialValues.shippingPlace.fullAddrress = id.fullAddress;
    initialValues.shippingPlace.addressType = id.addressType;
    updateFormData(initialValues);
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledName: true,
      disabledPhone: true,
      disabledRtn: true,
      disabledNameRtn: true,
      disabledEmail: true,
      disabledNotes: true,
    }));
  };

  const contactPersonRtn = async (rtn) => {
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledRtn: false,
    }));
    initialValues.shippingOwner.rtn = rtn;
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledRtn: true,
    }));
    await setRtnLocal(rtn);
  };

  const contactPersonNameRtn = async (nameRtn) => {
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disablednameRtn: false,
    }));
    initialValues.shippingOwner.nameRtn = nameRtn;
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disablednameRtn: true,
    }));
    await setNameRtnLocal(nameRtn);
  };

  const contactPersonEmail = (email) => {
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledEmail: false,
    }));
    initialValues.shippingOwner.email = email;
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledEmail: true,
    }));
  };

  const saveNotes = async (note) => {
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledNotes: false,
    }));
    initialValues.orderNotes = note;
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledNotes: true,
    }));
    await setNotesLocal(note);
  };

  const saveTimeOfArrival = async (item) => {
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledTimeOfArrival: false,
    }));
    initialValues.timeOfArrival = item;
    setDisabledItemsPersons((prevState) => ({
      ...prevState,
      disabledTimeOfArrival: true,
    }));
    await setTimeOfArrivalLocal(item);
  };
  return (
    <View style={styles.root}>
      <ContactInformation
        subTitle={subtitle}
        contactPhone={contactPersonPhone}
        contactPersonName={contactPersonName}
        contactPersonRtn={contactPersonRtn}
        contactPersonNameRtn={contactPersonNameRtn}
        contactPersonEmail={contactPersonEmail}
        nameValue={initialValues.shippingOwner.name}
        phoneValue={initialValues.shippingOwner.phone}
        rtnValue={initialValues.shippingOwner.rtn}
        nameRtnValue={initialValues.shippingOwner.nameRtn}
        emailValue={initialValues.shippingOwner.email}
        country={country}
        {...disabledItemsPersons}
      />
      {orderType === "pick" ? (
        <View style={styles.separator}>
          <Select
            event={saveTimeOfArrival}
            placeholder="Tiempo de llegada para retirar el pedido"
            items={optionsTimeOfArrival()}
            color={THEME.text.defaultColor}
            disabled={!disabledItemsPersons.disabledTimeOfArrival}
            value={initialValues.timeOfArrival}
          />
        </View>
      ) : null}
      <Text style={[styles.title, styles.notesTittle]}>
        Notas para la orden
      </Text>
      <Textarea
        rowSpan={5}
        value={initialValues.orderNotes}
        style={styles.textArea}
        placeholder="Nota"
        onChangeText={saveNotes}
      />
    </View>
  );
};

export default ShippingAddressForm;
