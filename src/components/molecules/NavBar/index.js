import React, { useEffect } from "react";
import { Actions } from "react-native-router-flux";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ShoppingCartButton } from "./../../atoms";
const LogoImage = require("../../../imgs/logos/pronto-logo.png");
import styles from "./styles";

const NavBar = ({
  title,
  routeName,
  productsNumber,
  showShoppingCart,
  showSideMenu,
  userCountry,
}) => {
  const openDrawer = () => {
    Actions.drawerOpen();
  };

  const goToBack = () => {
    Actions.pop();
  };

  const backAction = () => {
    const checkRouteNameOptions = routeName == "shoppingProcess";
    if (checkRouteNameOptions) {
      Alert.alert("Atención", `Abandonará ${title}. \n¿Desea continuar?`, [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Sí", onPress: () => goToBack() },
      ]);
    } else {
      goToBack(checkRouteNameOptions);
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.root}>
      {showSideMenu ? (
        <TouchableOpacity onPress={openDrawer} style={styles.col1}>
          <Icon style={styles.menuIcon} name="menu" color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => backAction(routeName)}
          style={styles.col1}
        >
          <Icon style={styles.icon} name="chevron-left" color="white" />
          {/* <Text style={styles.label}>Regresar</Text> */}
        </TouchableOpacity>
      )}
      <View style={styles.col2}>
        {title === "Home" || title === "Productos" ? (
          <Image style={styles.brandImage} source={LogoImage} />
        ) : (
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.col3}>
        {showShoppingCart &&
          (userCountry === "honduras" || userCountry === "el-salvador") && (
            <ShoppingCartButton productsNumber={productsNumber} />
          )}
      </View>
    </View>
  );
};

export default NavBar;
