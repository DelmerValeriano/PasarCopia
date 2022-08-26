import React, { useEffect, useState } from "react";
import { NavigationEvents } from "react-navigation";
import {
  View,
  Text,
  ScrollView,
  Platform,
  BackHandler,
  Alert,
  Image,
  Linking,
} from "react-native";
import {
  CoordinatorLayout,
  BottomSheetHeader,
  BottomSheetBehavior,
} from "react-native-bottom-sheet-behavior";
import auth from "@react-native-firebase/auth";
import { Actions } from "react-native-router-flux";
import wrappedView from "./../../../WrappedView";
import { Categories, Carousel } from "./../../molecules";
import { OrderTracking } from "./../../organisms";
import { Button, CarouselSlide } from "../../atoms";
import {
  getAllCategoriesItems,
  updateCarouselAndCategories,
  getLocalUserCountry,
  getLocalUserZone,
  getAllCarouselItems,
} from "../../../commons/localstorage";
import { getOrderActive } from "./../../../commons/services/orders";
import { getUid } from "./../../../commons/user";
import styles from "./styles";
import Modal from "react-native-modal";
import {
  getCofigurationApp,
  getQualificationActive,
  useCarouselItems,
} from "./../../../hooks/firebase";
import { THEME } from "../../../styles";
import DeviceInfo from "react-native-device-info";
const LogoImage = require("../../../imgs/logos/pronto-logo.png");

const Home = () => {
  const [types, setTypes] = useState([]);
  const [country, setCountry] = useState({ value: "", error: "" });
  const [state, setState] = useState({ isLoading: true, order: [] });
  const [isUser, setIsUser] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorToUpdate, setErrorToUpdate] = useState(false);
  const [itemCarousel, setCarouselItem] = useState([]);

  const fetchData = async () => {
    await updateLocalstorage();
    const userCountry = await getLocalUserCountry();
    const userZone = await getLocalUserZone();
    setCountry({ value: userCountry, error: "" });
    country.value = userCountry;

    const useCarousel = await useCarouselItems();
    if (useCarousel.length) {
      setCarouselItem(useCarousel);
    }

    const useCategories = await getAllCategoriesItems(
      country.value,
      userZone?.id
    );

    setTypes(useCategories);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Importante", "¿Deseas salir de la aplicación?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Aceptar", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    fetchData();
    getConfigurationApp();
    auth().onAuthStateChanged((user) => {
      setIsUser(!user && false);
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios" && isUser) {
      getActiveOrders();
    }
  }, [isUser]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    let res = await getQualificationActive();
    res.onSnapshot(
      { includeMetadataChanges: false },
      (snapshot) => {
        let ordersStore = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            ordersStore.push({ id: change.doc.id, ...change.doc.data() });
          }
        });
        if (ordersStore.length) {
          const { surveyapplied, id, orderType } = ordersStore[0];
          if (!surveyapplied) {
            Actions.orderQualification({ idQualification: id, orderType });
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getConfigurationApp = async () => {
    const installedVersion = DeviceInfo.getVersion();
    const configuration = await getCofigurationApp();
    if (configuration > installedVersion) {
      setModalVisible(true);
    }
  };
  const updateLocalstorage = async () => {
    await updateCarouselAndCategories();
  };

  const openOrderTracking = () => {
    Actions.orderTracking();
  };

  const RenderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetContent}>
        <OrderTracking state={state} FabActive={true} />
      </View>
    );
  };

  const getActiveOrders = async () => {
    if (getUid()) {
      let orderItems = await getOrderActive();
      if (orderItems.length === 0) {
        setIsUser(false);
      } else {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          order: orderItems,
        }));
        setIsUser(true);
      }
    } else {
      setIsUser(false);
    }
  };

  const handleBottomSheetChange = async (e) => {
    let elevation = e.nativeEvent.state;
    if (elevation == 3) {
      await getActiveOrders();
    }
  };

  const modalContent = () => (
    <View style={styles.contentModal}>
      <Image source={LogoImage} style={styles.imageHeader} />
      <Text style={styles.TittleModal}>Actualización disponible</Text>
      <Text style={styles.descriptionModal}>
        Para utilizar esta aplicación, descargue la última versión disponible en{" "}
        {Platform.OS === "ios" ? "App Store" : "Play Store"}.
      </Text>
      {errorToUpdate ? (
        <Text style={styles.descriptionModalError}>
          Se ha presentado un error, por favor, ve a{" "}
          {Platform.OS === "ios" ? "App Store" : "Play Store"} y actualiza la
          aplicación.
        </Text>
      ) : null}

      <Button
        title="Actualizar App"
        background={THEME.pronto.green}
        event={handleUpdateApp}
      />
    </View>
  );

  const handleUpdateApp = async () => {
    try {
      const APP_STORE_LINK =
        "https://apps.apple.com/us/app/tiendas-pronto/id1454392119";
      const PLAY_STORE_LINK = "market://details?id=com.yourappland.pronto";

      let supported = await Linking.canOpenURL(
        Platform.OS === "ios" ? APP_STORE_LINK : PLAY_STORE_LINK
      );

      setErrorToUpdate(!supported);

      if (Platform.OS === "ios") {
        if (supported) await Linking.openURL(APP_STORE_LINK);
      } else {
        if (supported) await Linking.openURL(PLAY_STORE_LINK);
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
  const openModal = (item) => {
    const { carouselType, id: idItem } = item;

    if (carouselType === "product") {
      Actions.productDetails({ product: null, categories: types, idItem });
    } else if (carouselType === "category") {
      types.forEach((element, index) => {
        const { id } = element;
        if (id === idItem) {
          Actions.productsView({
            categories: types,
            categorySelectedIndex: index,
          });
        }
      });
    }

    //
  };

  return Platform.OS === "android" ? (
    <CoordinatorLayout style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {itemCarousel.length > 0 && (
          <Carousel
            autoplay
            loop
            slides={itemCarousel}
            children={CarouselSlide}
            openModal={openModal}
            itemSelect={true}
          />
        )}

        <Categories categories={types} />
      </ScrollView>
      {isUser && (
        <BottomSheetBehavior
          anchorEnabled
          peekHeight={60}
          elevation={8}
          onStateChange={handleBottomSheetChange}
        >
          <View style={styles.bottomSheet}>
            <BottomSheetHeader>
              <View pointerEvents="none" style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetLeft}>
                  <Text style={styles.bottomSheetTitle}>Pedido en proceso</Text>
                  <Text
                    style={[
                      styles.bottomSheetTitle,
                      { fontSize: 12, fontWeight: "200" },
                    ]}
                  >
                    Desliza hacia arriba
                  </Text>
                </View>
              </View>
            </BottomSheetHeader>
            <RenderBottomSheetContent />
          </View>
        </BottomSheetBehavior>
      )}

      <Modal isVisible={isModalVisible}>{modalContent()}</Modal>

      <NavigationEvents onWillFocus={getActiveOrders} />
    </CoordinatorLayout>
  ) : (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {itemCarousel.length > 0 && (
          <Carousel
            autoplay
            loop
            slides={itemCarousel}
            children={CarouselSlide}
            openModal={openModal}
            itemSelect={true}
          />
        )}

        <Categories categories={types} />
      </ScrollView>
      {isUser && (
        <Button
          title="Pedido en proceso"
          style={{
            ...styles.bottomSheetHeader,
            height: 55,
            marginTop: 0,
          }}
          event={openOrderTracking}
        />
      )}
      <Modal isVisible={isModalVisible}>{modalContent()}</Modal>
      <NavigationEvents onWillFocus={getActiveOrders} />
    </>
  );
};

const homeConfigView = {
  showHeader: true,
  showShoppingCart: true,
  showSideMenu: true,
};

export default wrappedView(Home, homeConfigView);
