import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "./../../atoms";
import { showAlert } from "./../../../commons/notifications";
import styles from "./styles";

const SignUnForm = ({ submit, loading = false }) => {
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);

  const onSubmit = () => {
    let message = "";
    if (!fullName) message += "Su nombre completo es requerido\n";
    if (!email) message += "Su correo es requerido\n";
    if (!phone) message += "Su teléfono es requerido\n";
    if (!password1) message += "Su contraseña es requerido\n";
    if (!password2) message += "Debe repetir su contraseña\n";

    if (!message) {
      if (phone.length == 8) {
        if (password1 == password2) {
          if (password1.length > 5) {
            submit(fullName, phone, email, password1);
          } else
            showAlert("Error", "Su contraseña debe tener más de 5 caracteres");
        } else {
          showAlert("Error", "Sus contraseñas no coinciden");
        }
      } else {
        showAlert("Error", "Su número de teléfono debe tener 8 caracteres.");
      }
    } else {
      showAlert("Importante", message);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Input
          value={fullName}
          onChange={setFullName}
          placeholder="Nombre completo"
          icon="account"
          editable={!loading}
        />
      </View>
      <View style={styles.input}>
        <Input
          value={phone}
          onChange={setPhone}
          placeholder="Teléfono"
          icon="phone"
          editable={!loading}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          maxLength={8}
        />
      </View>
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
          value={password1}
          onChange={setPassword1}
          placeholder="Ingrese su contraseña"
          icon="lock"
          autoCapitalize="none"
          editable={!loading}
          secureTextEntry={true}
          autoCompleteType="password"
          textContentType="password"
        />
      </View>
      <View style={styles.input}>
        <Input
          value={password2}
          onChange={setPassword2}
          placeholder="Repetir contraseña"
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
          title="Crear cuenta"
          disabled={loading}
          event={onSubmit}
          style={styles.signInButton}
          labelStyles={styles.signInButtonLabel}
        />
      </View>
    </View>
  );
};

export default SignUnForm;
