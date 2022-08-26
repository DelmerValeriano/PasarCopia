import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import wrappedView from "./../../../WrappedView";
import { useCategoriesItems } from "./../../../hooks/firebase";
import { Button, ButtonSelect } from "./../../atoms";
import { getPersonalInfo } from "./../../../commons/user";
import { getIdToken } from "../../../commons/user";
import { getMyPoints } from "./../../../commons/services/myPoints";
import { THEME } from "../../../styles";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { getLocalUserCountry } from "../../../commons/localstorage";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";

const MyPoints = ({ showAlert }) => {
  const [personalInfo, setPersonalInfo] = useState(getPersonalInfo());
  const [isLoading, setIsLoadin] = useState(true);
  const [myPoints, setMyPoints] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    updateMyPoints();
  }, []);

  const updateMyPoints = async () => {
    const userCountry = await getLocalUserCountry();
    let itemsCategories = await useCategoriesItems();
    let items = await getMyPoints(await getIdToken(), userCountry);
    if (items) {
      setCategories(itemsCategories);
      setMyPoints(items.points);
    } else {
      showAlert("Error", "Se produjo un error al obtener sus puntos.");
    }
    setIsLoadin(false);
  };

  const openView = () => {
    Actions.pop();
    Actions.productsView({ categories, categorySelectedIndex: 0 });
  };

  const openViewtermsAndConditions = () => {
    Actions.pop();
    Actions.termsAndConditions();
  };
  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={styles.containerScroll}
      >
        <View>
          <View>
            <View style={styles.center}>
              <View style={styles.header}>
                <Text style={styles.textInformation}>
                  {personalInfo?.fullName ? personalInfo?.fullName[0] : ""}
                </Text>
              </View>
              <Text style={styles.textSize}>{personalInfo?.fullName}</Text>
              <Text style={styles.textEmail}>{personalInfo?.email}</Text>
            </View>
            <View style={styles.containerTittlePoints}>
              <Text style={styles.tittle}>Mis puntos acumulados</Text>
            </View>
            <View style={styles.description}>
              {isLoading ? (
                <ActivityIndicator
                  size={Platform.OS === "ios" ? "small" : "large"}
                />
              ) : (
                <>
                  <Text style={styles.quantityPoints}>
                    {myPoints?.points} Puntos
                  </Text>
                  <Text
                    style={styles.fontQuantity}
                  >{`Equivalente a ${formatCurrency(myPoints?.money)}`}</Text>
                </>
              )}
            </View>
            <Text style={styles.subTitle}>Otras opciones</Text>
            <ButtonSelect
              styles={styles.button}
              placeholder="Condiciones de uso"
              event={openViewtermsAndConditions}
              disabled={isLoading}
            />

            <Text style={styles.text}>
              Por cada pedido que realice y que pague mediante tarjetas o
              efectivo, se le otorgarán sus puntos.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonPoints}>
        <Button
          title="Seguir acumulando"
          height={55}
          borderRadius={15}
          disabled={isLoading}
          background={THEME.blackColor}
          labelStyles={{ fontSize: 16 }}
          event={openView}
        />
      </View>
    </View>
  );
};

const configMyPoints = {
  showHeader: true,
};

export default wrappedView(MyPoints, configMyPoints);
