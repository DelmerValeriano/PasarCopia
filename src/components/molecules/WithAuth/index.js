import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "./../../atoms";
import styles from "./styles";
import { THEME } from "./../../../styles";
import { AuthUserContext } from "../../../contexts/authUserProvider";

const WithAuth = ({ children, resolve }) => {
  const AuthUser = useContext(AuthUserContext);
  const { isAuthenticated } = AuthUser;

  const openSignInModal = () => {
    Actions.signInModal({
      event: () => {},
      callback: () => {
        resolve();
      },
    });
  };

  return (
    <View style={styles.root}>
      {isAuthenticated ? (
        <>{children}</>
      ) : (
        <View style={styles.content}>
          <Text style={styles.message}>Debe iniciar sesión para continuar</Text>
          <Icon style={styles.icon} name="md-key" />
          <Button
            title="Iniciar sesión"
            event={openSignInModal}
            height={40}
            width={200}
            borderRadius={8}
            background={THEME.pronto.green}
          />
        </View>
      )}
    </View>
  );
};

export default WithAuth;
