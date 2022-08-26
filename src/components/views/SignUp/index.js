import React, { useState, useContext } from "react";
import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { Spinner } from "../../molecules";
import { Actions } from "react-native-router-flux";
import wrappedView from "./../../../WrappedView";
import { SignUpForm } from "./../../molecules";
import { savePhoneToken } from "./../../../commons/services";
import { setCurrentUser, getPhoneToken } from "./../../../commons/user";
import { AuthUserContext } from "../../../contexts/authUserProvider";
import auth from "@react-native-firebase/auth";
import styles from "./styles";

const SignUp = ({ navigation, showAlert }) => {
  const { params } = navigation.state;
  const [loading, setLoading] = useState(false);
  const AuthUser = useContext(AuthUserContext);
  const { updateUser } = AuthUser;

  const showErrorMessage = (message) => {
    setLoading(false);
    setTimeout(() => {
      showAlert("Error", message);
    }, 300);
  };

  const signUp = async (fullName, phone, email, password) => {
    const personalInfo = {
      fullName,
      phone,
    };
    setLoading(true);
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({
        displayName: JSON.stringify(personalInfo),
      });

      setCurrentUser(user);
      Actions.popTo(params.currentScene);
      if (params.callback) {
        updateUser();
        setTimeout(() => params.callback(), 2000);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showErrorMessage(
          "Ya existe una cuenta registrada con el correo: " + email
        );
      } else if (error.code === "auth/invalid-email") {
        showErrorMessage("El correo " + email + " es inválido.");
      } else {
        showErrorMessage("Algo salió mal, inténtelo nuevamente.");
      }
    } finally {
      setLoading(false);
      await savePhoneToken(getPhoneToken());
    }
  };

  return (
    <ImageBackground
      source={require("../../../imgs/punto-pronto.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
        >
          <View>
            <View style={styles.headerInfo}>
              <View style={styles.containerLogo}>
                <Image
                  style={styles.brand}
                  source={require("./../../../imgs/logos/pronto-logo.png")}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.title}>Crear cuenta</Text>
              <Text style={styles.subTitle}>
                Ingrese su información personal
              </Text>
            </View>
            <View style={styles.signUpForm}>
              <SignUpForm submit={signUp} loading={loading} />
            </View>
            <Spinner visible={loading} label="Registrando..." />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const signInConfigView = {
  showHeader: true,
  isForm: true,
};

export default wrappedView(SignUp, signInConfigView);
