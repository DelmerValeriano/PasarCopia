import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "./../../atoms";
import { showAlert } from "./../../../commons/notifications";
import styles from "./styles";

const ChangePasswordForm = ({ submit, loading = false }) => {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword1, setNewPassword1] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);

  const onSubmit = () => {
    const validations = { message: "" };
    if (!currentPassword) {
      validations.message += "La contraseña actual es requerida\n";
    }
    if (!newPassword1) {
      validations.message += "La nueva contraseña es requerida\n";
    }
    if (!newPassword2) {
      validations.message += "Debe repetir la nueva contraseña\n";
    }
    if (!validations.message) {
      if (newPassword1 === newPassword2) {
        if (newPassword1.length > 5) {
          submit(currentPassword, newPassword1);
        } else {
          showAlert(
            "Importante",
            "La nueva contraseña debe tener 6 o más caracteres."
          );
        }
      } else {
        showAlert("Importante", "La nueva contraseña no coincide");
      }
    } else {
      showAlert("Importante", validations.message);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Input
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Contraseña actual"
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
          value={newPassword1}
          onChange={setNewPassword1}
          placeholder="Contraseña nueva"
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
          value={newPassword2}
          onChange={setNewPassword2}
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
          title="Cambiar contraseña"
          disabled={loading}
          event={onSubmit}
          style={styles.signInButton}
          labelStyles={styles.signInButtonLabel}
        />
      </View>
    </View>
  );
};

export default ChangePasswordForm;
