import { Actions } from "react-native-router-flux";
import { getUid, getProviderData, getIsAnonymous } from "./../commons/user";
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

const ItemsProfile = () => {
  return [
    {
      key: "menu-item-0",
      title: "Mis tarjetas",
      icon: "credit-card",
      color: THEME.pronto.yellow,
      event: () => {
        openViewWithAuth(() => Actions.myCreditCards());
      },
      uid: getUid(),
    },

    {
      key: "menu-item-3",
      title: "Mis direcciones",
      icon: "home-city",
      color: THEME.pronto.green,
      event: () => {
        Actions.myPlaces({ goTo: "myPlaces" });
      },
      uid: getUid(),
    },
    {
      key: "menu-item-4",
      title: "Historial de pedidos",
      icon: "history",
      color: THEME.pronto.yellow,
      event: () => {
        Actions.odersHistoryView();
      },
      uid: getUid(),
    },

    {
      key: "change-password",
      title: "Cambiar contraseña",
      icon: "lock",
      color: THEME.pronto.blue,
      event: () => {
        Actions.changePasswordModal({ goTo: "changePasswordModal" });
      },
      uid: getUid(),
      providerData: getProviderData(),
      getIsAnonymous: getIsAnonymous(),
    },
  ];
};

export { ItemsProfile };
