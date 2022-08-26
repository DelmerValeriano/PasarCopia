import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { globalStyles } from "./styles";
import NavBar from "./components/molecules/NavBar";
import { showAlert } from "./commons/notifications";
import { getCartLength, getLocalUserCountry } from "./commons/localstorage";

const wrappedView = (WrappedComponent, config) => ({ children, ...props }) => {
  const [productsNumber, setProductsNumber] = useState(0);
  const [userCountry, setUserCountry] = useState("");
  const { isForm, showHeader, showShoppingCart, showSideMenu } = config;
  const { title, routeName } = props.navigation.state.params;

  const onWillFocus = async () => {
    const quantityGetCartLength = await getCartLength();

    setProductsNumber(quantityGetCartLength);
  };

  useEffect(() => {
    const getCountry = async () => {
      setUserCountry(await getLocalUserCountry());
    };
    if (!userCountry) {
      getCountry();
    }
  }, [userCountry]);

  if (isForm) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <SafeAreaView style={globalStyles.root}>
          <View style={globalStyles.container}>
            {showHeader && (
              <NavBar
                title={title}
                routeName={routeName}
                showShoppingCart={showShoppingCart}
                showSideMenu={showSideMenu}
                productsNumber={productsNumber}
                userCountry={userCountry}
              />
            )}
            <WrappedComponent
              {...props}
              showAlert={showAlert}
              productsNumber={productsNumber}
              onWillFocus={onWillFocus}
              userCountry={userCountry}
            />
          </View>
          <NavigationEvents onWillFocus={onWillFocus} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <SafeAreaView style={globalStyles.root}>
        <View style={globalStyles.container}>
          {showHeader && (
            <NavBar
              title={title}
              routeName={routeName}
              showShoppingCart={showShoppingCart}
              showSideMenu={showSideMenu}
              productsNumber={productsNumber}
              userCountry={userCountry}
            />
          )}
          <WrappedComponent
            {...props}
            showAlert={showAlert}
            productsNumber={productsNumber}
            onWillFocus={onWillFocus}
            userCountry={userCountry}
          />
          <NavigationEvents onWillFocus={onWillFocus} />
        </View>
      </SafeAreaView>
    );
  }
};

export default wrappedView;
