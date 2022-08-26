import { Alert } from "react-native";

const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Aceptar",
      },
    ],
    { cancelable: false }
  );
};

export { showAlert };
