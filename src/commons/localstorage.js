import AsyncStorage from "@react-native-community/async-storage";
import { showAlert } from "./notifications";
import {
  useCategoriesItems,
  useStatesItems,
  useCarouselItems,
  getValidateCartData,
} from "./../hooks/firebase";
import { getUid } from "./user";

var products = [];
var allCategories = [];
let allCarousel = [];
let allZones = [];
let cartLength = { value: 0, modified: false };

const getLocalRecords = async () => {
  let uid = getUid();
  try {
    const localData = await AsyncStorage.multiGet([
      uid + "products",
      uid + "orders",
    ]);
    const products = localData[0][1] || [];
    const orders = localData[0][1] || [];
  } catch (e) {
    showAlert(
      "Error al cargar",
      "Ha ocurrido un error al cargar los datos locales"
    );
  }
};

const updateLocalProducts = async (list) => {
  products = list;
  const uid = getUid();
  try {
    await AsyncStorage.setItem(uid + "products", JSON.stringify(appointments));
  } catch (e) {
    showAlert(
      "Error al sincronizar",
      "Ha ocurrido un error al sincronizar los productos"
    );
  }
};

const getLocalProducts = () => {
  return products;
};

const getCartItems = async (validate = false) => {
  try {
    let cart = { data: [] };
    let res = [];
    const cartStorage = await AsyncStorage.getItem("cart");
    if (cartStorage) {
      cart.data = JSON.parse("[" + cartStorage + "]");
    }
    cart.data.sort((a, b) => {
      return b.cartPosition - a.cartPosition;
    });

    res = validate ? await getValidateCartData(cart.data) : cart.data;

    return res;
  } catch (error) {
    showAlert("Error", "Error al obtener los productos del carrito.");
  }
};

const getCartLength = async () => {
  try {
    if (cartLength.value > 0 || cartLength.modified) {
      return cartLength.value;
    } else {
      let cart = { data: [] };
      const cartStorage = await AsyncStorage.getItem("cart");
      if (cartStorage) {
        cart.data = JSON.parse("[" + cartStorage + "]");
      }
      cartLength = { value: cart.data.length, modified: true };
      return cart.data.length;
    }
  } catch (error) {
    showAlert("Error", "Error al obtener la cantidad productos en el carrito.");
  }
};

const addToCart = async (item, existInCart) => {
  try {
    const { id: productId, quantity, commentary } = item;
    let cart = { data: [], updateItem: [], snap: [], this: {} };
    cart.snap = await getCartItems();

    cart.updateItem = cart.snap.filter(({ id }) => id === productId);

    if (cart.updateItem.length === 1) {
      await updateCartItem(productId, quantity, commentary, existInCart);
    } else {
      cart.snap.push(item);
      cart.data = cart.snap;
      await saveCart(cart.data);
      cartLength = { value: cart.data.length, modified: true };
      return cart.data.length;
    }
  } catch (error) {
    showAlert("Error", "Error al agregar el producto al carrito.");
  }
};

const updateCartItem = async (
  productId,
  quantity,
  commentary,
  existInCart,
  products
) => {
  try {
    let cart = { data: [], updateItem: [], snap: [], this: {} };
    cart.snap = products ? products : await getCartItems();

    cart.updateItem = cart.snap.filter(({ id }) => id === productId);

    if (cart.updateItem.length === 1) {
      cart.this = cart.updateItem[0];
      cart.this.quantity = existInCart
        ? quantity
        : cart.this.quantity + quantity;
      cart.this.commentary = commentary ? commentary : cart.this.commentary;
      cart.data = cart.snap.filter(({ id }) => id !== productId);
      cart.data.push(cart.this);
    }
    cart.data = cart.snap;
    await saveCart(cart.data);
  } catch (error) {
    showAlert("Error", "Error al agregar el producto al carrito.");
  }
};

const saveCart = async (cart) => {
  try {
    let payload = [];
    cart.forEach((item) => {
      return payload.push(JSON.stringify(item));
    });
    await AsyncStorage.setItem("cart", payload.toString());
  } catch (error) {
    console.log(error);
    showAlert("Error", "Error al intentar guardar en el carrito.");
  }
};

const removeFromCart = async (productId) => {
  try {
    let cart = await getCartItems();
    let newCart = cart.filter(({ id }) => id !== productId);
    let payload = [];
    newCart.map((item) => {
      return payload.push(JSON.stringify(item));
    });

    cartLength = { value: newCart.length, modified: true };
    await AsyncStorage.setItem("cart", payload.toString());
    return newCart;
  } catch (error) {
    showAlert("Error", "Error al remover el producto del carrito.");
  }
};

const findProductInCart = async (productId) => {
  try {
    let cart = { snap: [] };
    cart.snap = await getCartItems();
    cart.target = cart.snap.filter(({ id }) => id === productId);
    if (cart.target.length > 0) {
      return { item: cart.target[0], found: true };
    } else {
      return { item: {}, found: false };
    }
  } catch (error) {
    showAlert("Error", "Error al buscar el producto.");
  }
};

const emptyCart = async () => {
  try {
    await AsyncStorage.setItem("cart", "");
    cartLength = { value: 0, modified: true };
  } catch (error) {
    showAlert("Error", "Error al limpiar carrito.");
  }
};

const removeUserDataLocal = async () => {
  try {
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("phone");
    await AsyncStorage.removeItem("rtn");
    await AsyncStorage.removeItem("nameRtn");
    await AsyncStorage.removeItem("note");
    await AsyncStorage.removeItem("time");
  } catch (error) {
    showAlert("Error", "Error al limpiar los datos locales del usuario");
  }
};

const removeZones = async () => {
  try {
    await AsyncStorage.removeItem("zonesItems");
  } catch (error) {
    showAlert("Error", "Error la zonas");
  }
};

const getAllZones = async (country) => {
  try {
    const userCountry = await getLocalUserCountry();
    let items = await useStatesItems();

    let payload = [];
    if (country === userCountry) {
      items.forEach((item) => {
        payload.push(JSON.stringify(item));
      });
      await AsyncStorage.setItem("zonesItems", payload.toString());

      allZones = items;
      return allZones;
    } else {
      await AsyncStorage.setItem("zonesItems", [].toString());
      allZones = items;
    }
  } catch (error) {
    console.log(error);
    showAlert("Error", "Error al obtener las las zonas.");
  }
};

const getAllCategoriesItems = async (country, zone = null) => {
  try {
    const userCountry = await getLocalUserCountry();
    const userZone = await getLocalUserZone();
    let payload = [];

    if (country === userCountry && userZone?.id === zone) {
      let items = await useCategoriesItems();
      items.forEach((item) => {
        payload.push(JSON.stringify(item));
      });
      await AsyncStorage.setItem("categoriesItems", payload.toString());
      if (allCategories.length === 0) {
        const categories = await AsyncStorage.getItem("categoriesItems");

        if (categories) {
          payload = JSON.parse("[" + categories + "]");
          allCategories = payload;
          return payload;
        } else {
          let items = await useCategoriesItems();
          items.forEach((item) => {
            payload.push(JSON.stringify(item));
          });
          await AsyncStorage.setItem("categoriesItems", payload.toString());
          allCategories = items;
          return items;
        }
      } else {
        return allCategories;
      }
    } else {
      await setLocalUserCountry(country);
      let items = await useCategoriesItems();
      await AsyncStorage.setItem("categoriesItems", [].toString());
      allCategories = items;
      return allCategories;
    }
  } catch (error) {
    showAlert("Error", "Error al obtener datos de las categorias.");
  }
};

const getAllCarouselItems = async (country) => {
  try {
    const userCountry = await getLocalUserCountry();
    let payload = [];
    if (country === userCountry) {
      let items = await useCarouselItems();
      items.forEach((item) => {
        payload.push(JSON.stringify(item));
      });
      await AsyncStorage.setItem("carouselItems", payload.toString());
      if (allCarousel.length === 0) {
        const carouselItems = await AsyncStorage.getItem("carouselItems");

        if (carouselItems) {
          payload = JSON.parse("[" + carouselItems + "]");
          allCarousel = payload;
          return payload;
        } else {
          let items = await useCarouselItems();
          items.forEach((item) => {
            payload.push(JSON.stringify(item));
          });
          await AsyncStorage.setItem("carouselItems", payload.toString());
          allCarousel = items;
          return items;
        }
      } else {
        return allCarousel;
      }
    } else {
      await setLocalUserCountry(country);
      let items = await useCarouselItems();
      await AsyncStorage.setItem("categoriesItems", [].toString());
      allCategories = items;
    }
  } catch (error) {
    showAlert("Error", "Error al obtener datos de las categorias.");
  }
};

const updateCarouselAndCategories = async () => {
  try {
    let payload = [];
    let categoriesItems = await useCategoriesItems();
    categoriesItems.forEach((item) => {
      payload.push(JSON.stringify(item));
    });

    await AsyncStorage.setItem("categoriesItems", payload.toString());
  } catch (error) {
    showAlert("Error", "Error al obtener categorías.");
  }
};

const getLocalUserCountry = async () => {
  let userCountry = "";
  try {
    userCountry = await AsyncStorage.getItem("userCountry");
    if (userCountry) {
      return userCountry;
    } else {
      return userCountry;
    }
  } catch (error) {
    showAlert(
      "Error",
      "Error al obtener la información del país seleccionado."
    );
  }
};

const getLocalUserZone = async () => {
  let userZone = "";
  try {
    userZone = await AsyncStorage.getItem("userZone");
    if (userZone) {
      return JSON.parse(userZone);
    } else {
      return userZone;
    }
  } catch (error) {
    showAlert(
      "Error",
      "Error al obtener la información de la zona seleccionado."
    );
  }
};

const setLocalUserCountry = async (country) => {
  try {
    await AsyncStorage.setItem("userCountry", country);
  } catch (error) {
    showAlert("Error", "Error al cambiar el país seleccionado.");
  }
};

const setLocalUserZone = async (zone) => {
  try {
    await AsyncStorage.setItem("userZone", JSON.stringify(zone));
  } catch (error) {
    showAlert("Error", "Error al cambiar la zona seleccionada.");
  }
};

const setNameLocal = async (name) => {
  try {
    await AsyncStorage.setItem("name", name);
  } catch (error) {
    showAlert("Error");
  }
};

const setPhoneLocal = async (phone) => {
  try {
    await AsyncStorage.setItem("phone", phone);
  } catch (error) {
    showAlert("Error");
  }
};

const setRtnLocal = async (rtn) => {
  try {
    await AsyncStorage.setItem("rtn", rtn);
  } catch (error) {
    showAlert("Error");
  }
};

const setNameRtnLocal = async (nameRtn) => {
  try {
    await AsyncStorage.setItem("nameRtn", nameRtn);
  } catch (error) {
    showAlert("Error");
  }
};

const setNotesLocal = async (note) => {
  await AsyncStorage.setItem("note", note);
};

const setTimeOfArrivalLocal = async (time) => {
  try {
    await AsyncStorage.setItem("time", time);
  } catch (error) {
    showAlert("Error");
  }
};

const getUserDataLocal = async () => {
  try {
    const rtn = await AsyncStorage.getItem("rtn");
    const nameRtn = await AsyncStorage.getItem("nameRtn");
    const phone = await AsyncStorage.getItem("phone");
    const note = await AsyncStorage.getItem("note");
    const name = await AsyncStorage.getItem("name");
    const time = await AsyncStorage.getItem("time");
    const data = {
      name,
      rtn,
      nameRtn,
      phone,
      note,
      time,
    };
    return data;
  } catch (error) {
    showAlert("Error", "Error al obtener elos datos.");
  }
};

export {
  updateCarouselAndCategories,
  getAllCategoriesItems,
  getLocalRecords,
  getCartLength,
  updateLocalProducts,
  updateCartItem,
  getLocalProducts,
  getCartItems,
  addToCart,
  removeFromCart,
  findProductInCart,
  emptyCart,
  getLocalUserCountry,
  setLocalUserCountry,
  setRtnLocal,
  setNameLocal,
  setPhoneLocal,
  setNameRtnLocal,
  setNotesLocal,
  setTimeOfArrivalLocal,
  getUserDataLocal,
  removeUserDataLocal,
  getAllZones,
  setLocalUserZone,
  getLocalUserZone,
  getAllCarouselItems,
  removeZones,
};
