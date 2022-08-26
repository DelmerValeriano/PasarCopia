import React, { useState } from "react";
import { View, ScrollView, Linking, Text, Alert } from "react-native";
import wrappedView from "../../../WrappedView";
import styles from "./styles";
import { SuggestionForm } from "../../organisms";
import { SocialMediaButton, Button } from "./../../atoms";
import { THEME } from "../../../styles";
import { sendSuggestion } from "./../../../commons/services/suggestion";
import { Spinner } from "../../molecules";
import { getIdToken, getPersonalInfo } from "./../../../commons/user";
import { SUGGESTION_EMAIL } from "./../../../commons/consts/credentials";
import { getSocialMedia, SOCIAL_MEDIA } from "../../../static/suggestion";

const Suggestion = ({ showAlert, userCountry }) => {
  const { gmail, facebook, instagram, whatsapp, youtube, tiktok } =
    getSocialMedia(userCountry);
  const currentUser = getPersonalInfo();
  const [enable, setEnable] = useState(false);
  const [storeDetail, setStoreDetail] = useState({
    address: null,
    coordinates: {
      latitude: null,
      longitude: null,
    },
    email: null,
    horaries: [],
    id: null,
    image: null,
    name: null,
    phone: null,
    services: null,
  });

  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const updateStore = (values) => {
    setStoreDetail(values);
  };

  const updateMessage = (value) => {
    setMessage(value);
  };

  const HandleSendSuggestion = async () => {
    try {
      setVisible(true);
      const data = {
        currentUser,
        storeDetail,
        message,
      };
      let res = await sendSuggestion(await getIdToken(), data);
      if (res.success) {
        setVisible(false);
        setMessage(null);
        setStoreDetail({
          address: null,
          coordinates: {
            latitude: null,
            longitude: null,
          },
          email: null,
          horaries: [],
          id: null,
          image: null,
          name: null,
          phone: null,
          services: null,
        });
        setTimeout(() => {
          showAlert(
            "Confirmación",
            "La sugerencia se ha enviado correctamente"
          );
        }, 300);
      } else {
        setVisible(false);
        setTimeout(() => {
          showAlert("Error", `${res.message}`);
        }, 300);
      }
    } catch (error) {
      setVisible(false);
      setTimeout(() => {
        showAlert(
          "Error",
          "Ha ocurrido un error inesperado, inténtelo más tarde."
        );
      }, 300);
    }
  };

  const handleSend = () => {
    if (storeDetail.id && message) {
      setEnable(false);
      Alert.alert(
        "Confirmar",
        "¿Desea enviar una sugerencia?",
        [
          {
            text: "Cancelar",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              HandleSendSuggestion();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      if (storeDetail.id == null) {
        showAlert("Importante", "Debe seleccionar una tienda");
      } else if (message == null || message === "") {
        showAlert("Importante", "Debe escribir un mensaje");
      }
    }
  };

  const handleLinking = (app, url) => {
    Linking.canOpenURL(app)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(app);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(() => {
        return Linking.openURL(url);
      });
  };
  return (
    <View style={styles.root}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SuggestionForm
          initialValues={storeDetail}
          message={message}
          updateFormData={updateStore}
          updateMessage={updateMessage}
        />
        <View style={styles.containerText}>
          <Text style={styles.text}>Contáctanos a través de:</Text>
        </View>

        <View style={styles.containerSocialMedia}>
          <SocialMediaButton
            height={60}
            disabled={enable}
            img={require("../../../imgs/socialMedia/Facebook.png")}
            event={() => {
              handleLinking(facebook.app, facebook.url);
            }}
          />
          <SocialMediaButton
            height={60}
            disabled={enable}
            img={require("../../../imgs/socialMedia/Gmail.png")}
            event={() => {
              handleLinking(
                `mailto:${SUGGESTION_EMAIL}?subject=Sugerencia&body=${
                  message ? message : ""
                }`,
                gmail.url
              );
            }}
          />
          <SocialMediaButton
            height={60}
            disabled={enable}
            img={require("../../../imgs/socialMedia/Instagram.png")}
            event={() => {
              handleLinking(instagram.app, instagram.url);
            }}
          />
          <SocialMediaButton
            height={60}
            disabled={enable}
            img={require("../../../imgs/socialMedia/Youtube.png")}
            event={() => {
              handleLinking(youtube.app, youtube.url);
            }}
          />

          <SocialMediaButton
            height={60}
            disabled={enable}
            img={require("../../../imgs/socialMedia/Whatsapp.png")}
            event={() => {
              Linking.openURL(whatsapp.app, whatsapp.url);
            }}
          />
          <SocialMediaButton
            height={60}
            disabled={enable}
            img={require("../../../imgs/socialMedia/tik-tok.png")}
            event={() => {
              handleLinking(tiktok.app, tiktok.url);
            }}
          />
        </View>
      </ScrollView>
      <Button
        title="Enviar sugerencia"
        height={60}
        disabled={enable}
        borderRadius={0}
        marginTop={0}
        event={handleSend}
        background={THEME.pronto.green}
      />
      <Spinner visible={visible} />
    </View>
  );
};

const SuggestionConfig = { showHeader: true };

export default wrappedView(Suggestion, SuggestionConfig);
