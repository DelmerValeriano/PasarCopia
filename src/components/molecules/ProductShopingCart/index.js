import React, { useState, useEffect } from "react";
import { View, Alert, Text, TextInput } from "react-native";
import { Thumbnail } from "native-base";
import { ProductInformation } from "../../atoms";
import { RoundedButton } from "../../atoms";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import { THEME } from "./../../../styles";
import styles from "./styles";
import { iconSizes } from "../../../commons/consts/sizes";
import FastImage from "react-native-fast-image";

const ProductShopingCart = (props) => {
  const { id, name, removeProduct, images, quantity, updateCart } = props;

  const [load, setLoad] = useState(false);

  const increaceQuanty = async () => {
    setLoad(true);
    await updateCart(id, 1);
    setLoad(false);
  };

  const decreaceQuanty = async () => {
    if (quantity > 1) {
      setLoad(true);
      await updateCart(id, -1);
      setLoad(false);
    }
  };

  const removeProductConfirm = () =>
    Alert.alert(
      `Eliminar: ${name} `,
      "¿Desea eliminar este producto del carrito de compras?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            await removeProduct(id);
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.root}>
      <View style={styles.productDetails}>
        <FastImage
          style={styles.productImage}
          source={{
            uri: images
              ? images[0].url
              : "https://firebasestorage.googleapis.com/v0/b/pronto-mcommerce-dev.appspot.com/o/honduras%2FGxQrMtZG9JUq7ZIxn8Uu%2Fproducts%2FAGUAZUL-7421600309035%2F1597471066389?alt=media&token=8345e055-e890-42e7-baf6-99d0e0a59c27",
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <ProductInformation {...props} quantity={quantity} />
        <View style={styles.numerict}>
          <RoundedButton
            event={removeProductConfirm}
            name="close"
            color={THEME.whiteColor}
            disabled={false}
            backgroundColor={THEME.pronto.red}
            iconSize={iconSizes.Medium}
            borderRadius={5}
            radius={iconSizes.Medium + 5}
          />
          <Text style={styles.total}>{formatCurrency(props.price)}</Text>
          <View style={styles.buttonGroups}>
            <RoundedButton
              event={decreaceQuanty}
              name="minus"
              color={THEME.blackColor}
              disabled={load || quantity === 1 ? true : false}
              iconSize={20}
              borderRadius={20}
              radius={35}
            />

            <TextInput
              style={styles.textInput}
              editable={false}
              defaultValue={`${quantity}`}
            />
            <RoundedButton
              event={increaceQuanty}
              name="plus"
              color={THEME.blackColor}
              disabled={load ? true : false}
              iconSize={20}
              borderRadius={20}
              radius={35}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductShopingCart;
