import React from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import SocialButton from "./index";

const FacebookButton = ({ onSuccess: handleSuccess, showSpinner }) => {
  const onFacebookButtonPress = async () => {
    if (showSpinner) {
      await showSpinner(true);
    }
    try {
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);
      if (!result.isCancelled) {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          setTimeout(() => {
            Alert.alert("Error", "Error al intentar obtener el token.");
          }, 300);
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(
          data.accessToken
        );
        const { user } = await auth().signInWithCredential(facebookCredential);
        if (handleSuccess) {
          handleSuccess(user);
        }
      } else {
        if (showSpinner) {
          await showSpinner(false);
        }
      }
    } catch (error) {
      console.log(error.message)
      if (showSpinner) {
        await showSpinner(false);
      }
      setTimeout(() => {
        Alert.alert(
          "Error",
          "No se ha podido iniciar sesión con Facebook, inténtelo de nuevo."
        );
      }, 300);
    }
  };

  return (
    <SocialButton
      image={require("./../../../imgs/socialMedia/Facebook.png")}
      event={onFacebookButtonPress}
      title="Ingresa con tu cuenta de Facebook"
    />
  );
};

export default FacebookButton;
