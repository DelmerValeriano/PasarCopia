import { showAlert } from "../commons/notifications";
import {
  categoriesDefault,
  limitProductsRequest,
  limitProductsSuggestedRequest,
  limitStoresRequest,
} from "../commons/consts/consts";
import { getLocalUserCountry, getLocalUserZone } from "../commons/localstorage";
import firestore from "@react-native-firebase/firestore";
import { Platform } from "react-native";
import { getUid } from "./../commons/user";
import { getCountriesZonesActive } from "../commons/services";
const db = firestore();

const getUserCountry = async () => {
  const country = await getLocalUserCountry();
  return country;
};

const getUserZone = async () => {
  const zone = await getLocalUserZone();
  return zone;
};

const useCarouselItems = async () => {
  const carouselImages = [];
  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();
    const caruselRef = db
      .collection("countries")
      .doc(userCountry)
      .collection("carousel")
      .where("enabled", "==", true);

    const finalRef = userZone
      ? caruselRef.where("zone", "==", userZone?.id)
      : caruselRef;

    const snapshot = await finalRef.get();
    snapshot.forEach((doc) => {
      if (doc.exists) {
        carouselImages.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
  } catch (error) {
    console.log(error);
    showAlert("Error", "No se ha podido obtener los productos del carusel.");
  }

  return carouselImages;
};

const useCategoriesItems = async () => {
  const types = [];
  const userCountry = await getUserCountry();
  const userZone = await getUserZone();
  try {
    const querySnapshot = await db
      .collection("countries")
      .doc(userCountry)
      .collection("types")
      .orderBy("position", "asc")
      .where("active", "==", true)
      .get();

    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        types.push({ id: doc.id, ...doc.data() });
      }
    });
    types.unshift(categoriesDefault);
  } catch (error) {
    console.log("error", error);
    showAlert("Error", "No se ha podido obtener los datos de las Categorías");
  }
  return types;
};

const validateProduct = async (id) => {
  let validate = false;
  const userCountry = await getUserCountry();
  try {
    if (id) {
      const querySnapshot = await db
        .collection("countries")
        .doc(userCountry)
        .collection("products")
        .doc(id)
        .get();
      if (querySnapshot.exists) {
        const { hidden } = querySnapshot.data();
        if (!hidden) {
          validate = true;
        }
      } else {
        validate = false;
      }
    } else {
      validate = true;
    }
  } catch (error) {
    validate = true;
    console.log("Error", "No se ha podido validar los productos");
  }
  return validate;
};

const getProductsByCategory = async (id, lastRecord, textSearch = null) => {
  const products = { data: [] };

  let search = textSearch ? textSearch : id;

  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();

    let countryRef = db.collection("countries").doc(userCountry);

    const productSearchRef = userZone
      ? countryRef
          .collection("pricesByZones")
          .doc(`${userZone?.id}`)
          .collection("products")
          .where("type", "==", "product")
          .where("hidden", "==", false)
          .where("enabledZone", "==", true)
          .orderBy("name", "asc")
      : countryRef
          .collection("products")
          .where("type", "==", "product")
          .where("hidden", "==", false)
          .orderBy("name", "asc");

    const productFilterRef = search
      ? productSearchRef.where("caseSearch", "array-contains", `${search}`)
      : userZone
      ? productSearchRef.where(
          "caseSearch",
          "array-contains",
          `${userZone?.id}`
        )
      : productSearchRef;

    const finalRef = lastRecord
      ? productFilterRef.startAfter(lastRecord).limit(limitProductsRequest)
      : productFilterRef.limit(limitProductsRequest);

    const productsGet = await finalRef.get();
    if (userZone) {
      for (const doc of productsGet.docs) {
        const { price } = doc.data();
        const productRef = countryRef.collection("products").doc(doc.id);
        const productGet = await productRef.get();
        products.data.push({ id: doc.id, ...productGet.data(), price });
      }
    } else {
      productsGet.forEach((doc) => {
        products.data.push({ id: doc.id, ...doc.data() });
      });
      products.success = true;
    }
  } catch (error) {
    console.log("error", error.message);
    showAlert(
      "Error",
      "Ocurrió un error inesperado al obtener productos, por favor intentelo más tarde. "
    );
  }
  return products;
};

const getProductsByCategoryOrder = async (
  id,
  lastRecord,
  order,
  getAll,
  textSearch
) => {
  const products = { data: [], dataProducts: [], success: false };
  try {
    const userCountry = await getUserCountry();

    let search = textSearch ? textSearch : id ? `${id}` : null;

    const productsRef = db
      .collection("countries")
      .doc(userCountry)
      .collection("products")
      .where("type", "==", "product")
      .where("hidden", "==", false)
      .orderBy(`price`, order);

    if (getAll === true) {
      products.snapshot = await productsRef.get();
    } else {
      const productSearchtRef = search
        ? productsRef.where("caseSearch", "array-contains", `${search}`)
        : productsRef;

      const finalRef = lastRecord
        ? productSearchtRef.startAfter(lastRecord).limit(limitProductsRequest)
        : productSearchtRef.limit(limitProductsRequest);
      products.snapshot = await finalRef.get();
    }
    products.snapshot.forEach((doc) => {
      products.data.push({ id: doc.id, ...doc.data() });
    });

    products.success = true;
  } catch (error) {
    showAlert(
      "Error",
      "Ocurrió un error inesperado al ordenar los productos por el precio."
    );
  }

  return { data: products.data, success: products.success };
};

const getSuggestedProducts = async (
  productCategories,
  productId,
  category,
  associatedType = false
) => {
  const products = { data: [] };
  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();
    const zoneActive = await getCountriesZonesActive(userCountry);
    const { active = false } = zoneActive;

    let productsRef;

    if (active) {
      productsRef = db
        .collection("countries")
        .doc(userCountry)
        .collection("pricesByZones")
        .doc(`${userZone?.id}`)
        .collection("products")
        .where("type", "==", "product")
        .where("hidden", "==", false)
        .orderBy("timesSold", "desc");
    } else {
      productsRef = db
        .collection("countries")
        .doc(userCountry)
        .collection("products")
        .where("type", "==", "product")
        .where("hidden", "==", false)
        .orderBy("timesSold", "desc");
    }
    const productCategory = category ? category : productCategories[0];

    if (productCategories && !associatedType) {
      const categorySnapshot = await db
        .collection("countries")
        .doc(userCountry)
        .collection("types")
        .doc(productCategory)
        .get();

      const associatedCategory = categorySnapshot.data()?.associatedCategory;

      if (categorySnapshot.exists && associatedCategory !== undefined) {
        productsRef = productsRef.where(
          "caseSearch",
          "array-contains",
          associatedCategory
        );
      }
    } else {
      productsRef = productsRef.where(
        "caseSearch",
        "array-contains",
        associatedType
      );
    }
    productsRef = productsRef.limit(limitProductsSuggestedRequest);
    products.snapshot = await productsRef.get();

    for (const doc of products.snapshot.docs) {
      products.data.push({ id: doc.id, ...doc.data() });
    }

    products.data = products.data.filter(({ id }) => id !== productId);
  } catch (error) {
    console.log(error);
    // showAlert(
    //   "Error",
    //   "Ocurrió un error inesperado al obtener productos sugeridos."
    // );
  }
  return products.data;
};

const useStatesItems = async () => {
  const states = [];
  try {
    const userCountry = await getUserCountry();
    const querySnapshot = await db
      .collection("countries")
      .doc(userCountry)
      .collection("zones")
      .where("enabled", "==", true)
      .get();
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        const { name } = doc.data();
        states.push({ id: doc.id, name });
      }
    });
  } catch (error) {
    console.log(error);
    showAlert("Error", "No se ha podido obtener los datos de las zonas");
  }
  return states;
};

const useMunicipalitiesItems = async (id) => {
  const municipalities = [];
  try {
    const userCountry = await getUserCountry();
    const querySnapshot = await db
      .collection("countries")
      .doc(userCountry)
      .collection(`states/${id}/municipalities`)
      .get();
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        municipalities.push({ id: doc.id, ...doc.data() });
      }
    });
  } catch (error) {
    showAlert("Error", "No se ha podido obtener los datos de los municipios");
  }
  return municipalities;
};

const useColoniesItems = async (idState, idColonie) => {
  const colonies = [];
  try {
    const userCountry = await getUserCountry();
    const querySnapshot = await db
      .collection("countries")
      .doc(userCountry)
      .collection(`states/${idState}/municipalities/${idColonie}/colonies`)
      .get();
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        colonies.push({ id: doc.id, ...doc.data() });
      }
    });
  } catch (error) {
    showAlert("Error", "No se ha podido obtener los datos de las colonias ");
  }
  return colonies;
};

const stores = async (getAll, lastRecord, textSearch) => {
  const stores = { dataStores: [] };

  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();
    const zoneActive = await getCountriesZonesActive(userCountry);
    const { active = false } = zoneActive;

    const countryRef = db.collection("countries").doc(userCountry);
    let storesRef;

    if (active) {
      storesRef = countryRef
        .collection("stores")
        .where("zone", "==", `${userZone?.id}`)
        .where("enabledZone", "==", true)
        .orderBy("name", "asc");
    } else {
      storesRef = countryRef.collection("stores").orderBy("name", "asc");
    }

    if (getAll) {
      const storesSearchtRef = lastRecord
        ? storesRef.startAfter(lastRecord).limit(limitStoresRequest)
        : storesRef.limit(limitStoresRequest);
      stores.snapshot = await storesSearchtRef.get();
    } else {
      const storesSearchtRef = storesRef.where(
        "caseSearch",
        "array-contains",
        textSearch
      );

      const finalRef = lastRecord
        ? storesSearchtRef.startAfter(lastRecord).limit(limitStoresRequest)
        : storesSearchtRef.limit(limitStoresRequest);
      stores.snapshot = await finalRef.get();
    }

    for (const doc of stores.snapshot.docs) {
      stores.dataStores.push({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.log("error", error);
    showAlert(
      "Error",
      "Ocurrió un error inesperado al obtener las tiendas, por favor intentelo más tarde. "
    );
  }
  return stores.dataStores;
};
const getStoresAll = async () => {
  const stores = { data: [] };
  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();
    const zoneActive = await getCountriesZonesActive(userCountry);
    const refCountry = db.collection("countries").doc(userCountry);
    const { active } = zoneActive;

    let querySnapshot;

    if (active) {
      querySnapshot = await refCountry
        .collection("stores")
        .where("zone", "==", `${userZone?.id}`)
        .where("enabledZone", "==", true)
        .get();
    } else {
      querySnapshot = await refCountry.collection("stores").get();
    }

    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        stores.data.push({ id: doc.id, ...doc.data() });
      }
    });
  } catch (error) {
    showAlert("Error", "Al obtener las tiendas.");
  }

  return stores.data;
};

const getStoreSelect = async (idStore) => {
  let store;
  try {
    const userCountry = await getUserCountry();

    const querySnapshot = await db
      .collection("countries")
      .doc(userCountry)
      .collection("stores")
      .doc(idStore)
      .get();

    const { services } = querySnapshot.data();
    if (services !== undefined) {
      const promises = services.map(async (element) => {
        const services = await element.service.get();
        return services.data();
      });
      const dataServices = await Promise.all(promises);
      store = {
        id: querySnapshot.id,
        ...querySnapshot.data(),
        services: dataServices,
      };
    } else {
      store = {
        id: querySnapshot.id,
        ...querySnapshot.data(),
        services: [],
      };
    }
  } catch (error) {
    showAlert("Error", "Al obtener la tienda.");
  }

  return store;
};

const getWhereToFindIt = async (productId) => {
  const whereFind = [];
  try {
    const userCountry = await getUserCountry();
    const productRef = db
      .collection("countries")
      .doc(userCountry)
      .collection("products")
      .doc(productId);
    const storeProduct = await productRef.collection("whereToFindIt").get();

    storeProduct.forEach((docStoreProduct) => {
      const { store } = docStoreProduct.data();
      if (store) {
        const fetchRef = async () => {
          const response = await store.get();
          whereFind.push({ id: response.id, ...response.data() });
        };
        fetchRef();
      }
    });
  } catch (error) {
    showAlert("Error", "Al obtener las tiendas donde encontrar producto.");
  }
  return whereFind;
};

const getDeliveryProviders = async () => {
  const zones = [];
  try {
    const userZone = await getUserZone();
    const userCountry = await getUserCountry();
    const zoneActive = await getCountriesZonesActive(userCountry);
    let deliveryRef = db
      .collection("countries")
      .doc(userCountry)
      .collection("deliveryProviders");

    const { active } = zoneActive;

    if (active) {
      deliveryRef.where("zone", "==", `${userZone?.id}`);
    } else {
      deliveryRef.where("name", "==", `urbano-now`);
    }

    const data = await deliveryRef.get();
    data.forEach((doc) => {
      const { geojson } = doc.data();
      zones.push(geojson);
    });
  } catch (error) {
    showAlert("Error", "Al obtener datos del mapa.");
  }
  return zones;
};

const getCofigurationApp = async () => {
  let configuration;
  try {
    const platformOs = Platform.OS === "ios" ? "Ios" : "Android";

    const refCofigurationApp = await db
      .collection("configuration")
      .doc(platformOs)
      .get();
    const { version } = refCofigurationApp.data();

    configuration = version;
  } catch (error) {
    showAlert("Error", "Al obtener los datos.");
  }
  return configuration;
};

const getQualificationActive = async () => {
  let statusRef;
  try {
    const userCountry = await getUserCountry();

    const uid = getUid();

    const qualificationRef = db
      .collection("countries")
      .doc(userCountry)
      .collection("qualifications");

    statusRef = qualificationRef
      .where("userId", "==", uid)
      .where("surveyapplied", "==", false)
      .orderBy("date.milliseconds", "desc")
      .limit(1);
  } catch (error) {
    showAlert("Error", "Al obtener los datos.");
  }
  return statusRef;
};

const validateActiveZone = async (zone) => {
  let status;
  try {
    const userCountry = await getUserCountry();
    const refZone = await db
      .collection("countries")
      .doc(userCountry)
      .collection("zones")
      .doc(zone)
      .get();

    const { enabled } = refZone.data();

    if (enabled) {
      status = true;
    } else {
      status = false;
    }
  } catch (error) {
    console.log(error);
    showAlert("Error", "No se ha podido obtener los datos de las zonas");
  }
  return status;
};

const verifyProductExistence = async (idProduct) => {
  let product = {};
  const userCountry = await getUserCountry();
  try {
    const userZone = await getUserZone();

    const productRef = await db
      .collection("countries")
      .doc(userCountry)
      .collection("products")
      .doc(idProduct)
      .get();

    if (productRef.exists) {
      const productData = productRef.data();

      if (productData[userZone.id]) {
        const { pricesByZones } = productRef.data();

        const { price } = pricesByZones[`${userZone?.id}`];
        product = {
          enabledInZone: true,
          ProductExists: true,
          ...productRef.data(),
          price: price ? price : productData?.price,
        };
      } else {
        product = {
          enabledInZone: false,
          ProductExists: true,
        };
      }
    } else {
      product = { enabledInZone: false, ProductExists: false };
    }
  } catch (error) {
    product = { enabledInZone: false, ProductExists: false };
  }
  return product;
};

const getAProduct = async (id) => {
  let product = {};
  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();
    const zoneActive = await getCountriesZonesActive(userCountry);
    const { active } = zoneActive;
    const productRef = await db
      .collection("countries")
      .doc(userCountry)
      .collection("products")
      .doc(id)
      .get();

    if (active) {
      const { pricesByZones } = productRef.data();
      const { price } = pricesByZones[`${userZone?.id}`];
      product = { ...productRef.data(), price, success: true };
    } else {
      product = { ...productRef.data(), success: true };
    }
  } catch (error) {
    console.log("error", error);
    product = { success: false };
    //   showAlert("Error", "No se ha podido obtener los datos del producto");
  }
  return product;
};

const getAZone = async () => {
  let zone = {};
  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();
    const zoneActive = await getCountriesZonesActive(userCountry);

    const { active } = zoneActive;

    if (active) {
      const getZone = await db
        .collection("countries")
        .doc(userCountry)
        .collection("zones")
        .doc(userZone?.id)
        .get();
      const { coordinates } = getZone.data();
      zone = coordinates;
    } else {
      if (userCountry === "el-salvador") {
        zone = {
          latitude: 13.68935,
          longitude: -89.18718,
        };
      }
    }
  } catch (error) {
    console.log(error);
    showAlert("Error", "No se ha podido obtener la zona");
  }
  return zone;
};

const getValidateCartData = async (products) => {
  try {
    const userCountry = await getUserCountry();
    const userZone = await getUserZone();

    const validatedProducts = [];

    for (const item of products) {
      const { id, cartPosition, quantity } = item;

      const cartProductProperties = { id, cartPosition, quantity };

      let dataAvailable = false;

      const refProduct = await db
        .collection("countries")
        .doc(userCountry)
        .collection("products")
        .doc(id)
        .get();

      if (refProduct.exists) {
        const { hidden, pricesByZones, price } = refProduct.data();

        const priceProduct = pricesByZones
          ? pricesByZones[`${userZone?.id}`].price
          : price;

        if (!hidden) {
          dataAvailable = true;
          validatedProducts.push({
            ...cartProductProperties,
            ...refProduct.data(),
            dataAvailable,
            price: priceProduct,
          });
        } else {
          validatedProducts.push({
            ...cartProductProperties,
            ...refProduct.data(),
            dataAvailable,
            price: priceProduct,
          });
        }
      } else {
        validatedProducts.push({
          ...cartProductProperties,
          ...refProduct.data(),
          dataAvailable,
        });
      }
    }
    return validatedProducts;
  } catch (error) {
    console.log(error);
  }
};
export {
  useCarouselItems,
  useCategoriesItems,
  getProductsByCategory,
  getSuggestedProducts,
  getProductsByCategoryOrder,
  useStatesItems,
  useMunicipalitiesItems,
  useColoniesItems,
  getStoresAll,
  getWhereToFindIt,
  getUserCountry,
  getDeliveryProviders,
  stores,
  getStoreSelect,
  getCofigurationApp,
  getQualificationActive,
  validateProduct,
  validateActiveZone,
  verifyProductExistence,
  getAProduct,
  getAZone,
  getValidateCartData,
};
