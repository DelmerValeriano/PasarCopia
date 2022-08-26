import React, { useState } from "react";
import { View, ScrollView, ImageBackground, Image, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import wrappedView from "../../../WrappedView";
import styles from "./styles";
import { UpdateProfileForm, Spinner } from "./../../molecules";
import auth from "@react-native-firebase/auth";

const UpdateProfile = ({ showAlert }) => {
  const [loading, setLoading] = useState(false);

  const showErrorMessage = (message) => {
    setLoading(false);
    setTimeout(() => {
      showAlert("Error", message);
    }, 300);
  };

  const signUp = async (fullName, phone, email) => {
    try {
      let personalInfo = {
        fullName,
        phone,
        email,
      };
      setLoading(true);

      await auth().currentUser.updateProfile({
        displayName: JSON.stringify(personalInfo),
      });

      Actions.pop();
    } catch (error) {
      showErrorMessage("Algo salió mal, inténtelo nuevamente.");
    } finally {
      setLoading(false);
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
          <View style={styles.headerInfo}>
            <View style={styles.containerLogo}>
              <Image
                style={styles.brand}
                source={require("./../../../imgs/logos/pronto-logo.png")}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Actualizar información</Text>
          </View>
          <View style={styles.root}>
            <View style={styles.signUpForm}>
              <UpdateProfileForm submit={signUp} loading={loading} />
            </View>
          </View>
          <Spinner visible={loading} overlayColor="rgba(1,1,1,0.7)" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const updateProfileConfig = { showHeader: true };

export default wrappedView(UpdateProfile, updateProfileConfig);
