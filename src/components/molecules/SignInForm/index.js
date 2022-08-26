import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "./../../atoms";
import { showAlert } from "./../../../commons/notifications";
import styles from "./styles";

const SignInForm = ({ submit, loading = false }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = () => {
    if (email) {
      if (password) {
        submit(email, password);
      } else {
        showAlert("Importante", "La contraseña es requerida");
      }
    } else {
      showAlert("Importante", "El correo es requerido");
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Input
          value={email}
          onChange={setEmail}
          placeholder="Ingrese su correo"
          icon="email"
          autoCapitalize="none"
          editable={!loading}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="username"
        />
      </View>
      <View style={styles.input}>
        <Input
          value={password}
          onChange={setPassword}
          placeholder="Ingrese su contraseña"
          icon="lock"
          autoCapitalize="none"
          editable={!loading}
          secureTextEntry={true}
          autoCompleteType="password"
          textContentType="password"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Iniciar sesión"
          disabled={loading}
          event={onSubmit}
          style={styles.signInButton}
          labelStyles={styles.signInButtonLabel}
        />
      </View>
    </View>
  );
};

export default SignInForm;
