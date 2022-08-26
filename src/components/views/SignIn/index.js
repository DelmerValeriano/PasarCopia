import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";
import { Spinner } from "../../molecules";
import DialogInput from "react-native-dialog-input";
import { Actions } from "react-native-router-flux";
import wrappedView from "./../../../WrappedView";
import { SignInForm } from "./../../molecules";
import { savePhoneToken } from "./../../../commons/services";
import { setCurrentUser, getPhoneToken } from "./../../../commons/user";
import { Button } from "./../../atoms";
import auth from "@react-native-firebase/auth";
import FacebookButton from "./../../molecules/SocialButton/FacebookButton";
import GoogleButton from "./../../molecules/SocialButton/GoogleButton";
import AppleButton from "./../../molecules/SocialButton/AppleButton";
import { AuthUserContext } from "../../../contexts/authUserProvider";
import styles from "./styles";

const SignIn = ({ navigation, showAlert, event }) => {
  const { params } = navigation.state;
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisble] = useState(false);
  const [email, setEmail] = useState(null);
  const AuthUser = useContext(AuthUserContext);
  const { updateUser } = AuthUser;

  const showErrorMessage = (message) => {
    setLoading(false);
    setTimeout(() => {
      showAlert("Error", message);
    }, 300);
  };

  const recoverPassword = async (userEmail) => {
    if (email) {
      await handleRecoverPassword(email);
    } else {
      if (!userEmail) {
        showAlert("importante", "Su correo es requerido\n");
      } else {
        await handleRecoverPassword(userEmail);
      }
    }
  };
  const handleRecoverPassword = async (userEmail) => {
    try {
      setIsDialogVisble(false);
      await auth().sendPasswordResetEmail(userEmail);
      Alert.alert(
        "Se envió un correo a su correo electrónico.",
        `${userEmail}`,
        [{ text: "Aceptar", onPress: () => openDialog(false) }],
        { cancelable: false }
      );
      setEmail(null);
    } catch (error) {
      setTimeout(() => showAlert("Error: ", `${error}`), 200);
      setEmail(userEmail);
    }
  };

  const openDialog = (isShow) => {
    setIsDialogVisble(isShow);
  };

  const signIn = async (email, password) => {
    setEmail(email);
    setLoading(true);
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      setCurrentUser(user);
      Actions.pop();
      if (params.callback) {
        params.callback();
      }
      setTimeout(() => {
        if (event) event();
      }, 600);
    } catch (error) {
      if (error === "The email addrress is badly formated") {
        showErrorMessage("El correo eletrónico es inválido");
      } else {
        showErrorMessage("El correo o su contraseña son incorrectos");
      }
    } finally {
      setLoading(false);
      await savePhoneToken(getPhoneToken());
    }
  };

  const openSignUpModal = () => {
    Actions.signUpModal({
      callback: params.callback,
      currentScene: params.currentScene,
    });
  };

  const successSocialMediaSignin = async (user) => {
    try {
      await auth().currentUser.updateProfile({
        displayName: JSON.stringify({
          fullName: user.providerData[0].displayName,
        }),
      });
      await auth().currentUser.updateEmail(user.providerData[0].email);
      setCurrentUser(auth().currentUser);
      Actions.pop();
      if (params.callback) {
        params.callback(); // Brayan: Esto de callback que objetivo tiene ?
      }
      setTimeout(() => {
        if (event) event();
      }, 600); //Brayan: Este delay que objetivo tiene?
      await savePhoneToken(getPhoneToken());
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        await auth().currentUser.delete();
        setTimeout(() => {
          showAlert(
            "Error",
            "Ya existe una cuenta asociada con el nuevo correo con el que desea acceder. Debe acceder con sus credenciales ya registradas."
          );
        }, 300);
      } else {
        setTimeout(() => {
          Alert.alert(
            "Error",
            "Ha ocurrido un error inesperado, si el error persiste inténtelo más tarde."
          );
        }, 300);
      }
    } finally {
      setLoading(false);
    }
  };

  const showSpinner = async (value) => {
    setLoading(value);
  };
  const anonymousSignin = async () => {
    try {
      setLoading(true);
      const personalInfo = {
        fullName: "Invitado",
        phone: null,
      };
      const { user } = await auth().signInAnonymously();

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
      showErrorMessage("Algo salió mal, inténtelo nuevamente.");
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
          <DialogInput
            isDialogVisible={isDialogVisible}
            title={"Restablecer su contraseña"}
            initValueTextInput={email}
            submitText={"Restablecer"}
            message={"Ingrese la dirección de correo electrónico de su cuenta."}
            hintInput={"Ingrese su correo"}
            submitInput={recoverPassword}
            closeDialog={() => {
              openDialog(false);
            }}
          />
          <View style={styles.headerInfo}>
            <View style={styles.containerLogo}>
              <Image
                style={styles.brand}
                source={require("./../../../imgs/logos/pronto-logo.png")}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Iniciar sesión</Text>
            <Text style={styles.subTitle}>
              Ingrese sus credenciales para continuar
            </Text>
          </View>
          <View style={styles.signInForm}>
            <SignInForm submit={signIn} loading={loading} />
            <TouchableOpacity
              onPress={() => openDialog(true)}
              style={{ paddingTop: 20 }}
            >
              <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.otherOptions}>
            <Button
              title="Crear cuenta"
              style={styles.createAccount}
              labelStyles={styles.createAccountLabel}
              event={openSignUpModal}
            />
         {/*    <FacebookButton
              onSuccess={successSocialMediaSignin}
              showSpinner={showSpinner}
            /> */}
            <GoogleButton
              onSuccess={successSocialMediaSignin}
              showSpinner={showSpinner}
            />
            {Platform.OS === "ios" && (
              <AppleButton
                onSuccess={successSocialMediaSignin}
                showSpinner={showSpinner}
              />
            )}
            {/* <AnonymousButton anonymousSignin={anonymousSignin} /> */}
          </View>
          <Spinner visible={loading} overlayColor="rgba(1,1,1,0.7)" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const signInConfigView = {
  showHeader: true,
  isForm: true,
};

export default wrappedView(SignIn, signInConfigView);
