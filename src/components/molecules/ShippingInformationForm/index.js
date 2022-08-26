import React from "react";
import { View, Text } from "react-native";
import { Textarea } from "native-base";
import { Select } from "./../../atoms";
import { optionsSelectMyplace } from "./../../../commons/consts/consts";
import { THEME } from "./../../../styles";
import styles from "./styles";

const ShippingInformationForm = ({
  title,
  updaterFullAddrress,
  fullAddrress,
  fullAddrressValue,
  typePlaces,
  updateAddressType,
}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator}>
        <Select
          event={updateAddressType}
          placeholder={"Selecionar tipo"}
          items={optionsSelectMyplace()}
          color={THEME.text.defaultColor}
          disabled={false}
          value={typePlaces}
        />
      </View>
      <View style={styles.separatorText}>
        <Textarea
          style={styles.inputTextArea}
          placeholder="Agregar dirección exacta"
          multiline={true}
          editable={fullAddrress}
          value={fullAddrressValue}
          numberOfLines={4}
          onChangeText={updaterFullAddrress}
        />
      </View>
    </View>
  );
};

export default ShippingInformationForm;
