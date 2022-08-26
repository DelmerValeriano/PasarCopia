import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { RoundedButton } from "../../atoms";
import {
  addToCart,
  findProductInCart,
  updateCartItem,
  removeFromCart,
} from "../../../commons/localstorage";
import { NavigationEvents } from "react-navigation";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import Tooltip from "react-native-walkthrough-tooltip";
import styles from "./styles";
import { THEME } from "./../../../styles";
import FastImage from "react-native-fast-image";

const CardProduct = ({
  name,
  images,
  product,
  event,
  item,
  onWillFocus,
  description,
  userCountry,
  ageRestriction,
  ageRestriction21years,
  price,
}) => {
  const [existInCart, setExistInCart] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [commentary, setCommentary] = useState("");
  const [findResult, setFindResult] = useState("");
  const [priceProduct, setPriceProduct] = useState(null);

  const processOrder = async () => {
    let products;
    if (product) {
      products = { ...product };
    } else {
      products = item;
    }

    if (existInCart) {
      await addToCart(
        {
          ...products,
          commentary,
          quantity: 1 + findResult.item.quantity,
          cartPosition: new Date().getTime(),
        },
        existInCart
      );
      findProduct(product ? product.id : item.id);
      await onWillFocus();
    } else {
      if (ageRestriction || ageRestriction21years) {
        const messageAlert =
          "Ten en cuenta que para poder hacer entrega de un producto con restricción de edad, nuestro repartidor solicitará tu identificación.";

        Alert.alert(
          "¿Eres mayor de edad?",
          messageAlert,
          [
            {
              text: "Cancelar",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Confirmar",
              onPress: async () => {
                AddToCartFirstTime(products);
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        AddToCartFirstTime(products);
      }
    }
  };

  const AddToCartFirstTime = async (products) => {
    await addToCart(
      {
        ...products,
        commentary,
        quantity: 1,
        cartPosition: new Date().getTime(),
      },
      existInCart
    );
    findProduct(product ? product.id : item.id);
    await onWillFocus();
  };
  useEffect(() => {
    findProduct(product ? product.id : item.id);
    handleGetProduct(price);
  }, [product, item]);

  const handleGetProduct = async (price) => {
    setPriceProduct(price);
  };

  const preProcessOrder = async () => {
    await processOrder();
  };

  const findProduct = async (productId) => {
    const findResult = await findProductInCart(productId);
    if (findResult.found) {
      setFindResult(findResult);
      setExistInCart(findResult.found);
      setQuantity(findResult.item.quantity);
    } else {
      setExistInCart(findResult.found);
      setQuantity(0);
    }
  };

  const onPress = () => {
    event(product || item);
  };

  const WillFocus = () => {
    const productExist = product ? product.id : item.id;
    findProduct(productExist);
  };

  const decreaceQuanty = async () => {
    if (quantity > 1) {
      const decreace = product ? product.id : item.id;
      await updateCartItem(decreace, -1);
      await findProduct(decreace);
      await onWillFocus(decreace);
      setQuantity(quantity - 1);
    } else {
      const productExist = product ? product.id : item.id;
      await removeFromCart(productExist);
      await findProduct(productExist);
      await onWillFocus(productExist);
    }
  };

  const handleCart = async () => {
    setToolTipVisible(true);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardProduct}>
        <View style={styles.contentImg}>
          {images !== undefined ? (
            <FastImage
              style={styles.productImage}
              source={{
                uri: images[0]?.url
                  ? images[0].url
                  : "https://firebasestorage.googleapis.com/v0/b/pronto-mcommerce-dev.appspot.com/o/honduras%2FGxQrMtZG9JUq7ZIxn8Uu%2Fproducts%2FAGUAZUL-7421600309035%2F1597471066389?alt=media&token=8345e055-e890-42e7-baf6-99d0e0a59c27",
                headers: { Authorization: "someAuthToken" },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            >
              {ageRestriction || ageRestriction21years ? (
                <View style={styles.containerRestriction}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.textRestriction}
                  >
                    {ageRestriction21years ? "+21" : "+18"}
                  </Text>
                </View>
              ) : null}
            </FastImage>
          ) : (
            <FastImage
              style={styles.productImage}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/pronto-mcommerce-dev.appspot.com/o/Logo%2Ficon.png?alt=media&token=1a2a4b69-dcfd-4745-8309-5d369106187e",
                headers: { Authorization: "someAuthToken" },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>

        <View style={styles.contentCart}>
          {(userCountry === "honduras" || userCountry === "el-salvador") && (
            <Tooltip
              isVisible={toolTipVisible}
              backgroundColor={"rgba(0,0,0,0.1)"}
              contentStyle={styles.red}
              content={
                <View style={styles.buttonGroupsCart}>
                  <RoundedButton
                    event={decreaceQuanty}
                    name={quantity === 1 ? "delete-outline" : "minus"}
                    iconSize={15}
                    radius={22}
                    color={THEME.blackColor}
                    borderColor={THEME.pronto.yellow}
                  />
                  <View style={styles.textInput}>
                    <View style={styles.badge}>
                      <Text style={styles.label}>{quantity}</Text>
                    </View>
                  </View>
                  <RoundedButton
                    event={preProcessOrder}
                    name="plus"
                    iconSize={15}
                    radius={22}
                    color={THEME.blackColor}
                    borderColor={THEME.pronto.yellow}
                  />
                </View>
              }
              placement="left"
              onClose={() => setToolTipVisible(false)}
            >
              <View style={styles.buttonGroups}>
                {quantity === 0 ? (
                  <RoundedButton
                    event={handleCart}
                    name="plus"
                    iconSize={15}
                    radius={22}
                    color={THEME.pronto.blackColor}
                    borderColor={THEME.pronto.yellow}
                    style={styles.blue}
                    zIndex={-1}
                  />
                ) : (
                  <TouchableOpacity onPress={handleCart} style={styles.root}>
                    <Text style={styles.textRoot}>{quantity}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </Tooltip>
          )}
        </View>

        <View style={styles.nameContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.nameProduct}
          >
            {name}
          </Text>
          {/*    <Text
            style={[styles.priceProduct, { fontWeight: "300" }]}
            numberOfLines={1}
          >
            {description}
          </Text> */}
        </View>

        {priceProduct && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceProduct}>
              {formatCurrency(priceProduct)}
            </Text>
          </View>
        )}
      </View>

      <NavigationEvents onWillFocus={WillFocus} />
    </TouchableOpacity>
  );
};

export default CardProduct;
