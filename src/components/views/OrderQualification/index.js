import { View } from "native-base";
import React, { useState } from "react";
import { ScrollView, Text, Image, Alert } from "react-native";
import wrappedView from "../../../WrappedView";
import { Rating, Spinner } from "../../molecules";
import styles from "./styles";
import { Button } from "./../../atoms";
import { THEME } from "../../../styles";
import { Textarea } from "native-base";
import { Actions } from "react-native-router-flux";
import { updateQualification } from "./../../../commons/services/qualification";
import { getIdToken } from "./../../../commons/user";

const OrderQualification = ({ showAlert, navigation }) => {
  const {
    params: { idQualification, orderType },
  } = navigation.state;

  const [shoppingExperience, setShoppingExperience] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [yourOrder, setYourOrder] = useState(0);
  const [driver, setDriver] = useState(0);
  const [comments, setComments] = useState(null);
  const [visible, setVisible] = useState(false);

  const ratingShoppingExperience = (rating) => {
    setShoppingExperience(rating);
  };

  const ratingDeliveryTime = (rating) => {
    setDeliveryTime(rating);
  };

  const ratingYourOrder = (rating) => {
    setYourOrder(rating);
  };

  const ratingDriver = (rating) => {
    setDriver(rating);
  };
  const saveComments = async (comment) => {
    setComments(comment);
  };

  const handleSend = (text) => {
    const validateDriver = driver > 0 && orderType === "delivery";
    if (
      text === "omitir" ||
      (text === "envíar" &&
        shoppingExperience > 0 &&
        deliveryTime > 0 &&
        yourOrder > 0 &&
        (validateDriver || orderType === "pick"))
    ) {
      const qualifications = {
        shoppingExperience,
        deliveryTime,
        yourOrder,
        driver,
        comments,
      };
      const data = text === "omitir" ? null : qualifications;
      Alert.alert(
        "Confirmar",
        `¿Desea ${text} la calificación?`,
        [
          {
            text: "Cancelar",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              await HandleQualification(data);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      showAlert("Importante", "Debe completar todas las calificaciones");
    }
  };

  const HandleQualification = async (data) => {
    try {
      setVisible(true);
      const token = await getIdToken();
      let res = await updateQualification(idQualification, token, data);
      if (res.success) {
        if (data !== null) {
          setTimeout(() => {
            showAlert(
              "Confirmación",
              "La calificación se ha enviado correctamente"
            );
          }, 300);
        }
      } else {
        setTimeout(() => {
          showAlert(
            "Error",
            "Ha ocurrido un error inesperado, inténtelo más tarde."
          );
        }, 300);
      }
      setVisible(false);
      Actions.homeView();
    } catch (error) {
      setTimeout(() => {
        showAlert(
          "Error",
          "Ha ocurrido un error inesperado, inténtelo más tarde."
        );
      }, 300);
      setVisible(false);
      Actions.homeView();
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Calificación de la orden</Text>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.containerRating}>
          <View style={styles.containerImage}>
            <Image
              style={styles.brand}
              source={require("./../../../imgs/logos/logo-pronto.png")}
              resizeMode="contain"
            />
          </View>

          <View style={styles.contentRating}>
            <Text style={styles.tittleRating}>Experiencia de compra</Text>
            <Rating event={ratingShoppingExperience} />
          </View>
          <View style={styles.contentRating}>
            <Text style={styles.tittleRating}>Tiempo de entrega</Text>
            <Rating event={ratingDeliveryTime} />
          </View>
          <View style={styles.contentRating}>
            <Text style={styles.tittleRating}>Tu pedido</Text>
            <Rating event={ratingYourOrder} />
          </View>
          {orderType === "delivery" && (
            <View style={styles.contentRating}>
              <Text style={styles.tittleRating}>Conductor</Text>
              <Rating event={ratingDriver} />
            </View>
          )}

          <Textarea
            rowSpan={5}
            value={comments}
            style={styles.textArea}
            placeholder="Comentarios"
            onChangeText={saveComments}
          />
        </View>
      </ScrollView>
      <View style={styles.contentButtons}>
        <Button
          title="Omitir"
          height={60}
          disabled={false}
          borderRadius={0}
          marginTop={0}
          background={THEME.pronto.blue}
          style={styles.Button}
          event={() => handleSend("omitir")}
        />
        <Button
          title="Enviar"
          height={60}
          disabled={false}
          borderRadius={0}
          marginTop={0}
          background={THEME.pronto.green}
          style={styles.Button}
          event={() => handleSend("envíar")}
        />
      </View>
      <Spinner visible={visible} />
    </View>
  );
};

const OrderQualificationConfig = { showHeader: false };

export default wrappedView(OrderQualification, OrderQualificationConfig);
