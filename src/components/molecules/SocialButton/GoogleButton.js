import React, { useEffect } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";
import { configureGoogleSignin } from "./../../../static/googleSigin";
import SocialButton from "./index";

const GoogleButton = ({ onSuccess: handleSuccess, showSpinner }) => {
  useEffect(() => {
    configureGoogleSignin();
  }, []);

  const onGoogleButtonPress = async () => {
    if (showSpinner) {
      await showSpinner(true);
    }
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user } = await auth().signInWithCredential(googleCredential);
      if (handleSuccess) {
        handleSuccess(user);
      }
    } catch (error) {
      if (showSpinner) {
        await showSpinner(false);
      }
      setTimeout(() => {
        Alert.alert(
          "Error",
          "No se ha podido iniciar sesión con Gmail, inténtelo de nuevo."
        );
      }, 300);
    }
  };

  return (
    <SocialButton
      image={require("./../../../imgs/socialMedia/Gmail.png")}
      event={onGoogleButtonPress}
      title="Ingresa con tu cuenta de Gmail"
    />
  );
};

export default GoogleButton;
