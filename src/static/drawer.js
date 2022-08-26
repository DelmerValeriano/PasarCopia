import { Actions } from "react-native-router-flux";
import { GoogleSignin } from "@react-native-community/google-signin";
import { Alert } from "react-native";
import { getUid, getProviderData } from "./../commons/user";
import auth from "@react-native-firebase/auth";
import { showAlert } from "./../commons/notifications";
import { configureGoogleSignin } from "./../static/googleSigin";
import { THEME } from "../styles";

export const openViewWithAuth = (openView) => {
  if (getUid()) {
    openView();
  } else {
    Actions.signInModal({
      callback: () => {
        openView();
      },
      currentScene: Actions.currentScene,
    });
  }
};

const confirmationClosedSesion = async () => {
  try {
    if (getProviderData() == "google.com") {
      // Marvin: la linea siguiente da un error en iOS.
      //await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    await auth().signOut();

    showAlert("Confirmación", "Se ha cerrado sesión exitosamente.");
  } catch (error) {
    showAlert("Confirmación", `${error.message}`);
  }
};

const closeSesion = () => {
  Alert.alert(
    "Confirmar",
    "¿Desea cerrar sesión?",
    [
      {
        text: "Cancelar",
      },
      {
        text: "Aceptar",
        onPress: async () => {
          try {
            if (getProviderData() === "google.com") {
              configureGoogleSignin();
              //  await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
            }
            await auth().signOut();

            showAlert("Confirmación", "Se ha cerrado sesión");
          } catch (error) {
            showAlert("Error", `${error.message}`);
          }
        },
      },
    ],
    { cancelable: false }
  );
};

const getMenuDrawer = () => {
  return [
    {
      key: "menu-item-0",
      title: "Inicio",
      icon: "home",
      color: THEME.pronto.red,
      event: () => {
        Actions.homeView();
      },
    },

    {
      key: "my-profile",
      title: "Mi perfil",
      color: THEME.pronto.purple,
      icon: "account",
      event: () => {
        Actions.MyProfile({ goTo: "storesView" });
      },
      providerData: getProviderData(),
      uid: getUid(),
    },

    {
      key: "menu-item-2",
      title: "Tiendas Pronto",
      img: require("../imgs/icons/PuntosPronto.png"),
      color: "red",
      event: () => {
        Actions.storesView();
      },
    },

    {
      key: "menu-item-3",
      title: "Mis favoritos",
      icon: "heart",
      color: THEME.pronto.green,
      event: () => {
        openViewWithAuth(() => Actions.myFavorites({ goTo: "myFavorites" }));
      },
    },

    {
      key: "menu-item-4",
      title: "¿Cómo franquiciar Pronto?",
      icon: "store",
      color: THEME.pronto.yellow,
      event: () => {
        Actions.Franchise();
      },
    },

    {
      key: "menu-item-5",
      title: "Mis tarjetas",
      icon: "credit-card",
      color: THEME.pronto.blue,
      event: () => {
        openViewWithAuth(() => Actions.myCreditCards());
      },
      uid: getUid(),
    },
    {
      key: "menu-item-6",
      title: "Mis direcciones",
      icon: "home-city",
      color: THEME.pronto.red,
      event: () => {
        Actions.myPlaces({ goTo: "myPlaces" });
      },
      uid: getUid(),
    },
    {
      key: "menu-item-7",
      icon: "gift",
      title: "Mis puntos",
      event: () => {
        openViewWithAuth(() => Actions.myPoints());
      },
      color: THEME.pronto.red,
      uid: getUid(),
    },
    {
      key: "menu-item-8",
      title: "Enviar sugerencia",
      icon: "comment",
      color: THEME.pronto.purple,
      event: () => {
        openViewWithAuth(() => Actions.Suggestion());
      },
    },

    {
      key: "menu-item-9",
      title: "Historial de pedidos",
      icon: "history",
      color: THEME.pronto.green,
      event: () => {
        Actions.odersHistoryView();
      },

      uid: getUid(),
    },
    {
      key: "menu-item-10",
      title: "Términos y Condiciones de Uso",
      icon: "security",
      color: THEME.pronto.yellow,
      event: () => Actions.termsAndConditions(),
    },
    {
      key: "menu-item-11",
      title: "Políticas de privacidad",
      icon: "file-document",
      color: THEME.pronto.blue,
      event: () => Actions.privacyPolicies(),
    },
    {
      key: "change-password",
      title: "Cambiar contraseña",
      icon: "lock",
      color: THEME.pronto.red,
      event: () => {
        Actions.changePasswordModal({ goTo: "changePasswordModal" });
      },
      providerData: getProviderData(),
      uid: getUid(),
    },
    {
      key: "menu-item-12",
      title: "Cerrar sesión",
      icon: "logout-variant",
      color: THEME.pronto.purple,
      event: closeSesion,
      uid: getUid(),
    },
  ];
};

export { getMenuDrawer };
