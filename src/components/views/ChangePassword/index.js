import React, { useState } from "react";
import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import { Spinner } from "../../molecules";
import wrappedView from "./../../../WrappedView";
import { ChangePasswordForm } from "./../../molecules";
import { RESET_PASSWORD_MESSAGES } from "./../../../commons/consts/messages";
import styles from "./styles";
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";

const ChangePassword = ({ showAlert }) => {
  const [loading, setLoading] = useState(false);
  const showErrorMessage = (message) => {
    setLoading(false);
    setTimeout(() => {
      showAlert("Error", message);
    }, 300);
  };

  const handleSubmit = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const currentUser = auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await currentUser.reauthenticateWithCredential(credential);
      await currentUser.updatePassword(newPassword);
      Actions.pop();
      setTimeout(() => {
        showAlert("Confirmación", RESET_PASSWORD_MESSAGES.success);
      }, 500);
    } catch (error) {
      const message = RESET_PASSWORD_MESSAGES[error.code];
      showErrorMessage(message || RESET_PASSWORD_MESSAGES.default);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../imgs/punto-pronto.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
        >
          <View style={styles.headerInfo}>
            <View style={styles.containerLogo}>
              <Image
                style={styles.brand}
                source={require("./../../../imgs/logos/pronto-logo.png")}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Cambiar contraseña</Text>
            <Text style={styles.subTitle}>
              Ingrese su contraseña actual y la nueva contraseña a la que desea
              cambiar.
            </Text>
          </View>
          <ChangePasswordForm loading={loading} submit={handleSubmit} />
          <Spinner visible={loading} label="Cambiando..." />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const signInConfigView = {
  showHeader: true,
  isForm: true,
};

export default wrappedView(ChangePassword, signInConfigView);
