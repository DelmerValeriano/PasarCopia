import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "./../../atoms";
import { showAlert } from "./../../../commons/notifications";
import styles from "./styles";
import { getPersonalInfo } from "./../../../commons/user";

const SignUnForm = ({ submit, loading = false }) => {
  const currentUser = getPersonalInfo();
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);

  const onSubmit = () => {
    let message = "";
    if (!fullName) message += "Su nombre completo es requerido\n";
    if (!email) message += "Su correo es requerido\n";
    if (!phone) message += "Su teléfono es requerido\n";

    if (!message) {
      if (phone.length == 8) {
        submit(fullName, phone, email);
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
          editable={false}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="username"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Actualizar"
          disabled={
            fullName !== currentUser.fullName || phone !== currentUser.phone
              ? false
              : true
          }
          event={onSubmit}
          style={
            fullName !== currentUser.fullName || phone !== currentUser.phone
              ? styles.signInButton
              : styles.signInButtonDisabled
          }
          labelStyles={styles.signInButtonLabel}
        />
      </View>
    </View>
  );
};

export default SignUnForm;
