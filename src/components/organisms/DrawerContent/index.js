import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { DrawerMenuItem, ButtonSelect } from "./../../atoms";
import { countries } from "../../../commons/consts/countries";
import { BASE64_PNG } from "../../../commons/consts/images";
import {
  getLocalUserCountry,
  getLocalUserZone,
} from "../../../commons/localstorage";
import { getMenuDrawer } from "./../../../static/drawer";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthUserContext } from "../../../contexts/authUserProvider";
import { globalStyles } from "../../../styles";
import { uppercaseText } from "../../../commons/consts/consts";

const DrawerContent = () => {
  const MENU = getMenuDrawer();
  const AuthUser = useContext(AuthUserContext);
  const { isAuthenticated, email, fullName } = AuthUser;
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentZone, setCurrentZone] = useState("");

  useEffect(() => {
    getCurrentCountry();
  }, []);

  const getCurrentCountry = async () => {
    const localCountry = await getLocalUserCountry();
    const localZone = await getLocalUserZone();
    setCurrentCountry(countries.filter(({ id }) => id === localCountry)[0]);
    setCurrentZone(localZone?.id);
  };

  const currentCountryFormat = () => (
    <View style={styles.selectView}>
      <Image
        style={{ width: 60 * 0.4, height: 35 * 0.4 }}
        source={{
          uri: `${BASE64_PNG}${currentCountry.flag}`,
        }}
      />
      <View style={{ paddingLeft: 8 }}>
        <Text style={styles.countryName}>{`${
          currentZone ? uppercaseText(currentZone) : ""
        }${currentZone ? "," : ""} ${currentCountry.name}`}</Text>
      </View>
    </View>
  );
  const handleLogin = () => {
    Actions.signInModal({
      callback: () => {
        Actions.homeView();
      },
      currentScene: Actions.currentScene,
    });
  };
  const handleMyProfile = () => {
    Actions.MyProfile();
  };
  const handleCountry = () => {
    Actions.countrySelect({
      initialCountry: currentCountry.id,
      behavior: "select",
    });
  };

  return (
    <SafeAreaView style={globalStyles.root}>
      <View style={styles.root}>
        <View style={styles.brandContainer}>
          {isAuthenticated ? (
            <View style={styles.rootUser}>
              {/* <TouchableOpacity
                style={styles.col1}
                onPress={() => handleMyProfile()}
                disabled={currentCountry.id !== "honduras"}
              >
                <View style={styles.header}>
                  <Icon style={styles.IconAccount} name="account"></Icon>
                </View>
                <Text style={styles.miProfileLabel}>Mi perfil</Text>
              </TouchableOpacity> */}
              <View style={styles.col1}>
                <Image
                  style={styles.tinyLogo}
                  source={require("./../../../imgs/logos/logo-pronto.png")}
                />
              </View>
              <View style={styles.col2}>
                {fullName !== null ? (
                  <Text numberOfLines={1} style={styles.title}>
                    {fullName}
                  </Text>
                ) : null}
                {email !== null ? (
                  <Text numberOfLines={1} style={styles.subTitle}>
                    {email}
                  </Text>
                ) : null}

                <View style={styles.selectCountryButton}>
                  <ButtonSelect
                    placeholder={currentCountry.name}
                    event={handleCountry}
                    children={currentCountryFormat()}
                    styles={styles.buttonBorder}
                    iconName="chevron-down"
                    iconSize={16}
                    iconColor="white"
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.rootUser}>
              <View style={styles.col1}>
                <Image
                  style={styles.tinyLogo}
                  source={require("./../../../imgs/logos/logo-pronto.png")}
                />
              </View>
              <View style={styles.col2}>
                <TouchableOpacity
                  style={styles.contentLogin}
                  onPress={() => handleLogin()}
                >
                  <Text style={styles.title}>Pronto</Text>
                  <View style={styles.rootLogin}>
                    <View style={styles.col1Login}>
                      <Icon style={styles.icon} name="login-variant"></Icon>
                    </View>
                    <View style={styles.col2Login}>
                      <Text style={styles.title}>Iniciar sesión</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.selectCountryButton}>
                  <ButtonSelect
                    placeholder={currentCountry.name}
                    event={handleCountry}
                    children={currentCountryFormat()}
                    styles={styles.buttonBorder}
                    iconName={"chevron-down-sharp"}
                    iconSize={16}
                    iconColor="white"
                  />
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView>
            <View style={styles.menuContainer}>
              {MENU.map((menuItem) => {
                if (menuItem.hasOwnProperty("uid")) {
                  if (!menuItem.providerData) {
                    return isAuthenticated && <DrawerMenuItem {...menuItem} />;
                  } else if (
                    (menuItem.providerData === "password" &&
                      menuItem.key === "change-password") ||
                    (menuItem.providerData === "password" &&
                      menuItem.key === "my-profile")
                  ) {
                    return <DrawerMenuItem {...menuItem} />;
                  }
                } else {
                  return <DrawerMenuItem {...menuItem} />;
                }
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
