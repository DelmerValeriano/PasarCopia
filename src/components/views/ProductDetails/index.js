import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getIsFavorite,
  actionFavorites,
} from "../../../commons/services/products";
import { Carousel, ProductCard, ProductDetail } from "./../../molecules";
import wrappedView from "./../../../WrappedView";
import { CarouselSlide, Button, Input } from "./../../atoms";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import { HorizontalScroll } from "./../../organisms";
import {
  getSuggestedProducts,
  getWhereToFindIt,
  getAProduct,
} from "../../../hooks/firebase";
import {
  addToCart,
  findProductInCart,
  removeFromCart,
} from "../../../commons/localstorage";
import { showAlert } from "../../../commons/notifications";
import { Actions } from "react-native-router-flux";
import { getIdToken, getUid } from "../../../commons/user";
import { getFormattedImages } from "../../../commons/formatData";
import { dialogConfirmAddProduct } from "../../../commons/consts/dialogInputTexts";
import styles from "./styles";
import { THEME } from "../../../styles";
import ImageViewer from "react-native-image-zoom-viewer";
import { NavigationEvents } from "react-navigation";

const ProductDetails = ({
  navigation: {
    state: {
      params: { product, title, id, idItem, associatedType },
    },
  },
  onWillFocus,
  userCountry,
}) => {
  const [thisProduct, setThisProduct] = useState(product);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [loadingSuggested, setLoadingSuggested] = useState(true);
  const [productsSuggested, setProductsSuggested] = useState([]);
  const [existInCart, setExistInCart] = useState(false);
  const [commentary, setCommentary] = useState("");
  const [favorite, setFavorite] = useState(null);
  const [idToken, setIdToken] = useState("");
  const [stores, setStores] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const height = 35;

  useEffect(() => {
    if (product?.images?.length) {
      const Images = [];
      product.images.forEach((element, index) => {
        Images.push({ ...element, index });
      });
      setImages(Images);

      getSuggested(product);
    }
  }, [product]);

  useEffect(() => {
    if (idItem) {
      getProduct(idItem);
    }
  }, [idItem]);

  const getProduct = async (idItem) => {
    const responseGetAProduct = await getAProduct(idItem);
    if (responseGetAProduct?.success) {
      setLoading(false);
      const dataProduct = { id: idItem, ...responseGetAProduct };
      setThisProduct(dataProduct);
      setImages(responseGetAProduct?.images);
      setLoading(false);
      setSubTotal(responseGetAProduct?.price);
      getSuggested(dataProduct);
    }
  };
  const processOrder = async () => {
    await addToCart(
      {
        ...thisProduct,
        commentary,
        quantity,
        cartPosition: new Date().getTime(),
      },
      existInCart
    );
    findProduct(thisProduct?.id ? thisProduct?.id : idItem);
    await onWillFocus();
  };

  const favoriteCheck = async (productId) => {
    await getIdToken().then(async (idToken) => {
      setFavorite(await getIsFavorite(idToken, productId));
      setIdToken(idToken);
    });
  };

  const onPressFavorite = async () => {
    if (getUid()) {
      setFavorite(!favorite);
      const res = await actionFavorites(
        idToken,
        thisProduct?.id ? thisProduct?.id : idItem,
        !favorite
      );

      if (!res.success) {
        setFavorite(!favorite);
        showAlert(
          "Error",
          "Al intentar agregar o remover de favoritos, por favor vuelva a intentar más tarde."
        );
      }
    } else {
      Actions.signInModal({ event: favoriteCheck });
    }
  };

  const preProcessOrder = async () => {
    if (thisProduct?.ageRestriction) {
      const messageAlert =
        "Ten en cuenta que para poder hacer entrega de un producto con restricción de edad, nuestro repartidor solicitará tu identificación.";

      Alert.alert(
        "¿Eres mayor de edad?",
        messageAlert,
        [
          {
            text: "Cancelar",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: async () => {
              processOrder();
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      await processOrder();
    }
  };

  const increaceQuanty = () => {
    setQuantity(quantity + 1);
    setSubTotal(thisProduct?.price * (quantity + 1));
  };

  const decreaceQuanty = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setSubTotal(thisProduct?.price * (quantity - 1));
    } else {
      setQuantity(quantity - 1);
      const productExist = thisProduct?.id ? thisProduct?.id : idItem;
      await removeFromCart(productExist);
      await findProduct(productExist);
      await onWillFocus();
    }
  };

  const getSuggested = async (item) => {
    setLoadingSuggested(true);
    const dataSuggestedProducts = await getSuggestedProducts(
      item?.categories || [],
      item?.id,
      id,
      associatedType
    );

    setProductsSuggested(dataSuggestedProducts);
    setLoadingSuggested(false);
  };

  const changeProduct = async (item) => {
    setLoading(true);
    const responseGetAProduct = await getAProduct(item.id);
    const dataProduct = { id: item.id, ...responseGetAProduct };
    setThisProduct(dataProduct);
    setImages(responseGetAProduct?.images);
    getSuggested(dataProduct);
    setFavorite(null);
    setQuantity(1);
    setSubTotal(responseGetAProduct?.price);
    findProduct(item?.id);
    setCommentary(dataProduct?.commentary);
    await favoriteCheck(item?.id);
    setLoading(false);
  };

  const findProduct = async (productId) => {
    const findResult = await findProductInCart(productId);
    setExistInCart(findResult.found);
    if (findResult.found) {
      setQuantity(findResult.item.quantity);
      setCommentary(findResult.item.commentary);
      const responseGetAProduct = await getAProduct(findResult.item.id);
      if (responseGetAProduct?.success) {
        const dataProduct = { id: idItem, ...responseGetAProduct };
        setThisProduct(dataProduct);
        setSubTotal(responseGetAProduct?.price * findResult.item.quantity);
      }
    } else {
      setQuantity(0);
    }
  };

  const onChangeCommentary = (text) => {
    setCommentary(text);
  };

  const getStoresWhereIsProduct = async (productId) => {
    setStores(await getWhereToFindIt(productId));
  };

  const goToStoresInMap = () => {
    Actions.whereToFindIt({ stores });
  };

  useEffect(() => {
    findProduct(thisProduct?.id ? thisProduct?.id : idItem);
    favoriteCheck(thisProduct?.id ? thisProduct?.id : idItem);
    getStoresWhereIsProduct(thisProduct?.id ? thisProduct?.id : idItem);
  }, []);

  const openModal = (index) => {
    setIndex(index);
    setModalVisible(true);
  };

  const onFocus = async () => {
    findProduct(thisProduct?.id ? thisProduct?.id : idItem);
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.containerSpinner}>
            <ActivityIndicator size="large" color={THEME.pronto.yellow} />
          </View>
        ) : (
          <>
            <View>
              <Modal
                visible={modalVisible}
                transparent={true}
                animationType={"slide"}
                onRequestClose={() => {
                  setModalVisible(false);
                }}
              >
                <ImageViewer imageUrls={images} index={index} />
                <View style={styles.containerClose}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icon style={styles.icon} name="close-circle" />
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <Carousel
              slides={getFormattedImages(images)}
              children={CarouselSlide}
              autoplay
              loop
              title={title}
              openModal={openModal}
            />
            <View style={styles.productDetail}>
              <ProductDetail
                {...thisProduct}
                increaceQuanty={increaceQuanty}
                decreaceQuanty={decreaceQuanty}
                quantityProducts={quantity}
                existInCart={existInCart}
                isFavorite={favorite}
                eventFavorite={onPressFavorite}
                eventOpenMap={goToStoresInMap}
                userCountry={userCountry}
              />
            </View>
            {false && (
              <View style={styles.instruction}>
                <Text style={styles.instructionsText}>
                  Instrucciones Especiales
                </Text>
                <Input
                  placeholder={dialogConfirmAddProduct.hintInput}
                  onChange={onChangeCommentary}
                  value={commentary}
                  height={height}
                  maxLength={dialogConfirmAddProduct.maxLength}
                  autoCapitalize="sentences"
                  multiline={true}
                />
              </View>
            )}
            <View style={styles.horizontalProducts}>
              {loadingSuggested ? (
                <View>
                  <ActivityIndicator size="large" color={THEME.pronto.yellow} />
                </View>
              ) : (
                <HorizontalScroll
                  title="Acompáñalo con:"
                  items={productsSuggested}
                  child={ProductCard}
                  event={changeProduct}
                  onWillFocus={onWillFocus}
                  userCountry={userCountry}
                />
              )}
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.containerButton}>
        {userCountry === "honduras" || userCountry === "el-salvador" ? (
          <Button
            title={`${existInCart ? "Actualizar" : "Agregar"} ${formatCurrency(
              subTotal
            )}`}
            height={60}
            borderRadius={0}
            marginTop={0}
            event={() => preProcessOrder()}
            background={existInCart ? THEME.pronto.green : THEME.pronto.yellow}
            disabled={quantity > 0 ? false : true}
          />
        ) : null}
      </View>
      <NavigationEvents onWillFocus={onFocus} />
    </View>
  );
};
const ProductDetailsConfigView = {
  showHeader: true,
  isForm: true,
  showShoppingCart: true,
};

export default wrappedView(ProductDetails, ProductDetailsConfigView);
