import React from "react";
import StackRouter from "./src/router";
import SplashScreen from "react-native-splash-screen";
import { Platform, Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import Icon from "react-native-vector-icons/Ionicons";
import { decode, encode } from "base-64";
import { setPhoneToken } from "./src/commons/user";
import {
  // getAllCarouselItems,
  getAllCategoriesItems,
  getLocalUserCountry,
  getLocalUserZone,
  getAllZones,
  // getAllCarouselItems,
} from "./src/commons/localstorage";
import { AuthUserProvider } from "./src/contexts/authUserProvider";
import { CountryProvider } from "./src/contexts/countryProvider";
import {
  getUserCountry,
  getUserZone,
} from "./src/commons/helpers/formatCurrency";
import { Actions } from "react-native-router-flux";
import { validateActiveZone } from "./src/hooks/firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { country: "" };
    Icon.loadFont();
  }

  async componentDidMount() {
    await getUserCountry();
    await getUserZone();
    const country = await getLocalUserCountry();
    const zone = await getLocalUserZone();

    if (country) {
      if (zone) {
        const validateZone = await validateActiveZone(zone?.id);
        if (validateZone) {
          this.setState({ country });
          await getAllCategoriesItems(country, zone?.id);
        } else {
          this.setState({ country: undefined });
        }
      } else {
        this.setState({ country });
      }
      await getAllZones(country);
      // await getAllCarouselItems(country);
    } else {
      this.setState({ country: undefined });
    }
    messaging()
      .getToken()
      .then((token) => {
        setPhoneToken(token);
      });

    if (Platform.OS === "ios") {
      this.requestUserPermission();
    }
    SplashScreen.hide();

    messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        const title = remoteMessage?.notification?.title;
        const content = remoteMessage?.notification?.body;
        Alert.alert(title || "Nueva notificación", content);
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const route = remoteMessage?.data?.route;
          const parameters = remoteMessage?.data?.route_parameters;
          Actions.push(route, JSON.parse(parameters));
        }
      });
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.warn("Authorization status:", authStatus);
    }
  };

  base64Config = () => {
    if (!global.btoa) {
      global.btoa = encode;
    }
    if (!global.atob) {
      global.atob = decode;
    }
  };

  UNSAFE_componentWillMount() {
    this.base64Config();
  }

  render() {
    return (
      <CountryProvider>
        <AuthUserProvider>
          <StackRouter country={this.state.country} />
        </AuthUserProvider>
      </CountryProvider>
    );
  }
}

export default App;
