import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import wrappedView from "./../../../WrappedView";
import { ProductShopingCart, Spinner } from "../../molecules";
import { ShoppingCartHeader, Button, RoundedButton } from "../../atoms";
import { THEME } from "./../../../styles";
import {
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../../../commons/localstorage";
import { useCategoriesItems } from "./../../../hooks/firebase";
import { getUid } from "./../../../commons/user";
import { getSubtotal } from "../../../commons/processOrder";
import { getOrderActive } from "../../../commons/services/orders";
import { iconSizes } from "../../../commons/consts/sizes";
import { NavigationEvents } from "react-navigation";

import styles from "./styles";

const ShoppingCart = ({ showAlert }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleProductValidation = async (productsCart) => {
    for (const product of productsCart) {
      const { dataAvailable, id } = product;

      if (!dataAvailable) {
        const productId = id;
        const productIndex = products.findIndex(({ id }) => id == productId);

        let newProducts = [...products];

        const elementsToDelete = productIndex >= 0 ? 1 : 0;

        newProducts.splice(productIndex, elementsToDelete);

        setProducts(newProducts);
        await removeFromCart(id);
      }
    }
  };

  const processOrder = async (orderType) => {
    await handleProductValidation(products);
    if (products.length >= 1) {
      setLoading(true);
      const validatedProducts = await getCartItems();
      if (getUid()) {
        const activeOrder = await getOrderActive();
        if (activeOrder.length) {
          setTimeout(() => {
            showAlert(
              "¡Lo sentimos!",
              "Tienes una orden en proceso, para poder realizar otra debes esperar hasta que esta finalice."
            );
          }, 500);
        } else {
          if (orderType === "delivery") {
            Actions.myPlaces({
              action: (address) => {
                Actions.pop();
                Actions.replace("selectStore", {
                  orderType,
                  products: validatedProducts,
                  address,
                });
              },
              orderType,
            });
          } else {
            Actions.selectStore({
              orderType,
              products: validatedProducts,
            });
          }
        }
      } else {
        Actions.signInModal({
          callback: () => {
            if (orderType === "delivery") {
              Actions.myPlaces({
                action: (address) => {
                  Actions.selectStore({
                    orderType,
                    products: validatedProducts,
                    address,
                  });
                },
                orderType,
              });
            } else {
              Actions.selectStore({
                orderType,
                products: validatedProducts,
              });
            }
          },
          currentScene: Actions.currentScene,
        });
      }
      setLoading(false);
    }
  };

  const removeProduct = async (productId) => {
    const productIndex = products.findIndex(({ id }) => id == productId);

    let newProducts = [...products];

    const elementsToDelete = productIndex >= 0 ? 1 : 0;

    newProducts.splice(productIndex, elementsToDelete);

    setProducts(newProducts);

    await removeFromCart(productId);
  };

  const getCart = async (action) => {
    try {
      action !== "update" && setLoading(true);

      const categoriesItems = await useCategoriesItems();
      setCategories(categoriesItems);

      const validateProduct = true;
      const cartItems = await getCartItems(
        action === "update" ? !validateProduct : validateProduct
      );

      if (cartItems?.length) {
        setProducts(cartItems);
      } else {
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setProducts([]);
      console.log("errr", error);
    }
  };

  const updateCart = async (productId, value) => {
    const productIndex = products.findIndex(({ id }) => id == productId);

    let newProducts = [...products];
    const { quantity } = newProducts[productIndex];

    newProducts[productIndex] = {
      ...newProducts[productIndex],
      quantity: quantity + value,
    };

    setProducts(newProducts);

    await updateCartItem(productId, value, false, false, products);
  };

  const addProducts = () => {
    Actions.pop();
    Actions.productsView({ categories, categorySelectedIndex: 0 });
  };

  const selectTypeOrder = async (type) => {
    await processOrder(type);
  };
  useEffect(() => {
    getProductsCart();
  }, []);

  const getProductsCart = async () => {
    await getCart("get");
  };
  return (
    <View style={styles.root}>
      <ScrollView>
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductShopingCart
              key={index}
              {...product}
              removeProduct={removeProduct}
              updateCart={updateCart}
            />
          ))
        ) : (
          <Text style={styles.noProductsText}>
            No hay productos en el carrito
          </Text>
        )}
        <TouchableOpacity
          style={styles.addProducts}
          onPress={addProducts}
          disabled={loading}
        >
          <View style={styles.contentAddProducts}>
            <RoundedButton
              event={addProducts}
              name="plus"
              color={THEME.whiteColor}
              disabled={false}
              backgroundColor={THEME.pronto.green}
              iconSize={17}
              borderRadius={25}
              radius={30}
            />

            <Text style={styles.textColor}> Agregar algo más</Text>
          </View>
        </TouchableOpacity>
        {products.length > 0 && (
          <ShoppingCartHeader
            productsNumber={products.length}
            subTotal={getSubtotal(products)}
          />
        )}
      </ScrollView>
      <View style={styles.containerButton}>
        <View style={styles.colum1}>
          <Button
            iconName="bike"
            title="Pedir a domicilio"
            width="90%"
            height={85}
            sizeIcon={iconSizes.Large + 30}
            borderRadius={4}
            marginTop={15}
            event={() => {
              selectTypeOrder("delivery");
            }}
            background={
              products.length > 0 ? THEME.pronto.blue : THEME.grayColor
            }
            disabled={products.length > 0 ? false : true}
          />
        </View>

        <View style={styles.colum2}>
          <Button
            iconName="car-back"
            title="Pick'n Go"
            subTitle="Recoger productos en tu tienda favorita"
            width="90%"
            height={85}
            sizeIcon={iconSizes.Large + 30}
            borderRadius={4}
            event={() => selectTypeOrder("pick")}
            background={
              products.length > 0 ? THEME.pronto.green : THEME.grayColor
            }
            disabled={products.length > 0 ? false : true}
          />
        </View>
      </View>
      <Spinner visible={loading} label="" />
      <NavigationEvents onWillFocus={getProductsCart} />
    </View>
  );
};

const shoppingCartConfigView = {
  showHeader: true,
};

export default wrappedView(ShoppingCart, shoppingCartConfigView);
