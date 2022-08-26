import React from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleButton as AppleButtonSignIn,
} from "@invertase/react-native-apple-authentication";

const AppleButton = ({ onSuccess: handleSuccess, showSpinner }) => {
  const onAppleButtonPress = async () => {
    if (showSpinner) {
      await showSpinner(true);
    }
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;
      if (identityToken) {
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        );

        const { user } = await auth().signInWithCredential(appleCredential);
        if (handleSuccess) {
          handleSuccess(user);
        }
      } else {
        setTimeout(() => {
          showAlert(
            "Error",
            "No se ha podido iniciar sesión con Apple, inténtelo de nuevo."
          );
        }, 300);
      }
    } catch (error) {
      if (showSpinner) {
        await showSpinner(false);
      }
      setTimeout(() => {
        Alert.alert(
          "Error",
          "No se ha podido iniciar sesión con Apple, inténtelo de nuevo."
        );
      }, 300);
    }
  };

  return (
    <AppleButtonSignIn
      buttonStyle={AppleButtonSignIn.Style.BLACK}
      buttonType={AppleButtonSignIn.Type.SIGN_IN}
      style={{
        width: "97%",
        height: 40,
        margin: "2%",
      }}
      onPress={onAppleButtonPress}
    />
  );
};

export default AppleButton;
