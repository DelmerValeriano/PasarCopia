import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { ListItem, Body, Right, ActionSheet, Root } from "native-base";
import { RoundedButton } from "./../../atoms";
import styles from "./styles";

const CardMyPlace = ({
  addressType,
  fullAddress,
  event,
  id,
  disabled,
  deleteMyPlace,
  index,
}) => {
  const myPlaceSelect = () => {
    if (event) {
      event(id);
    }
  };

  const onPresButton = () => {
    if (deleteMyPlace) {
      ActionSheet.show(
        {
          options: ["Eliminar", "Cancelar"],
          cancelButtonIndex: 1,
          title: "Seleccione una opción",
        },
        deletePlace
      );
    }
  };

  const deletePlace = (key) => {
    if (key === 0) {
      Alert.alert(
        "Confirmar",
        "¿Desea eliminar esta dirección?",
        [
          {
            text: "Cancelar",
          },
          {
            text: "Aceptar",
            onPress: () => {
              let itemsDeleteState = {
                idPlace: id,
              };
              deleteMyPlace(itemsDeleteState, index);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  const ActionsButtom = () => {
    if (disabled) {
      return (
        <RoundedButton
          name="dots-vertical"
          borderRadius={5}
          radius={35}
          iconSize={20}
          event={onPresButton}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <ListItem avatar>
      <TouchableOpacity
        disabled={disabled}
        style={styles.container}
        onPress={myPlaceSelect}
      >
        <View style={styles.centerItems}>
          <View style={styles.root}>
            <Image
              style={styles.image}
              source={require("./../../../imgs/my-places-icon.png")}
              resizeMode="contain"
            />
          </View>
        </View>
        <Body>
          <Text style={styles.textInformation}>{addressType}</Text>

          <Text style={styles.label} numberOfLines={1}>
            {fullAddress}
          </Text>
        </Body>
        <Right style={styles.actions}>
          <ActionsButtom />
        </Right>
      </TouchableOpacity>
    </ListItem>
  );
};

export default CardMyPlace;
