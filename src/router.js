import React from "react";
import { Router, Scene, Stack, Modal, Drawer } from "react-native-router-flux";
import { Root } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerContent } from "./components/organisms";
import { THEME } from "./styles";
import {
  HomeView,
  OrdersHistoryView,
  SignInModal,
  ShoppingCart,
  MyCreditCards,
  NewCreditCard,
  ProductDetails,
  PrivacyPolicies,
  TermsAndConditions,
  ProductsView,
  SearchProducts,
  ShoppingProcess,
  ListColonies,
  MyFavorites,
  SignUpModal,
  MyPlaces,
  OrderDetails,
  RegisterMyPlaces,
  StoresView,
  WhereToFindIt,
  ChangePasswordModal,
  CountrySelect,
  SelectStore,
  Franchise,
  WebViewFranchise,
  Suggestion,
  ListStore,
  MyProfile,
  MapPlaces,
  StoresDetails,
  CongratulationsView,
  SelectedStore,
  OrderTracking,
  UpdateProfile,
  MyPoints,
  SearchStores,
  OrderQualification,
  TerritorySelect,
} from "./components/views";

const StackRouter = ({ country }) => {
  return (
    <Router>
      <Modal hideNavBar>
        {!country && (
          <Stack key="initial">
            <Scene
              title="Seleccionar País"
              key="countrySelect"
              component={CountrySelect}
              hideNavBar={true}
            />
          </Stack>
        )}
        <Stack key="root">
          <Drawer key="drawer" contentComponent={DrawerContent} hideNavBar>
            <Scene
              title="Home"
              key="homeView"
              component={HomeView}
              hideNavBar={true}
              icon={({ focused }) => (
                <Icon
                  size={25}
                  color={focused ? THEME.primary : THEME.secondary}
                  name="md-home"
                  regular
                />
              )}
            />
          </Drawer>
          <Scene
            title="Buscar producto"
            key="searchProducts"
            component={SearchProducts}
            hideNavBar={true}
          />
          <Scene
            title="Políticas de privacidad"
            key="privacyPolicies"
            component={PrivacyPolicies}
            hideNavBar={true}
          />
          <Scene
            title="Términos y condiciones"
            key="termsAndConditions"
            component={TermsAndConditions}
            hideNavBar={true}
          />
          <Scene
            title="Productos"
            key="productsView"
            component={ProductsView}
            hideNavBar={true}
          />
          <Scene
            title="Mis tajetas"
            key="myCreditCards"
            component={MyCreditCards}
            hideNavBar={true}
          />
          <Scene
            title="Detalle producto"
            key="productDetails"
            component={ProductDetails}
            hideNavBar={true}
          />
        </Stack>
        <Scene
          title="Mis favoritos"
          key="myFavorites"
          component={MyFavorites}
          hideNavBar={true}
        />
        <Scene
          title="Pedidos"
          key="odersHistoryView"
          component={OrdersHistoryView}
          hideNavBar={true}
        />
        <Scene
          title="Tiendas"
          key="storesView"
          component={StoresView}
          hideNavBar={true}
        />
        <Scene
          title=""
          key="signInModal"
          component={SignInModal}
          hideNavBar={true}
        />
        <Scene
          title=""
          key="signUpModal"
          component={SignUpModal}
          hideNavBar={true}
        />
        <Scene
          title=""
          key="changePasswordModal"
          component={ChangePasswordModal}
          hideNavBar={true}
        />
        <Scene
          title="Carrito de compra"
          key="shoppingCartModal"
          component={ShoppingCart}
          hideNavBar={true}
        />
        <Scene
          title="Registrar tarjeta"
          key="newCreditCard"
          component={NewCreditCard}
          hideNavBar={true}
        />
        <Scene
          title="Proceso de compra"
          key="shoppingProcess"
          component={ShoppingProcess}
          hideNavBar={true}
        />
        <Scene
          title="Lista de Colonias"
          key="listColonies"
          component={ListColonies}
          hideNavBar={true}
        />
        <Scene
          title="Mis tajetas"
          key="myCreditCards"
          component={MyCreditCards}
          hideNavBar={true}
        />
        <Scene
          title="Detalle del pedido"
          key="orderDetails"
          component={OrderDetails}
          hideNavBar={true}
        />
        <Scene
          title="Mis direcciones"
          key="myPlaces"
          component={MyPlaces}
          hideNavBar={true}
        />
        <Scene
          title="Registrar una dirección"
          key="myPlacesRegister"
          component={RegisterMyPlaces}
          hideNavBar={true}
        />
        <Scene
          title="Donde Encontrarlo"
          key="whereToFindIt"
          component={WhereToFindIt}
          hideNavBar={true}
        />
        <Scene
          title="Seleccione una tienda"
          key="selectStore"
          component={SelectStore}
          hideNavBar={true}
        />
        <Scene
          title="Franquiciar"
          key="Franchise"
          component={Franchise}
          hideNavBar={true}
        />
        <Scene
          title="Franquiciar"
          key="WebViewFranchise"
          component={WebViewFranchise}
          hideNavBar={true}
        />
        <Scene
          title="Sugerencia"
          key="Suggestion"
          component={Suggestion}
          hideNavBar={true}
        />
        <Scene
          title="Lista de tiendas"
          key="ListStore"
          component={ListStore}
          hideNavBar={true}
        />
        <Scene
          title="Mapa"
          key="MapPlaces"
          component={MapPlaces}
          hideNavBar={true}
        />
        <Scene
          title="Mi perfil"
          key="MyProfile"
          component={MyProfile}
          hideNavBar={true}
        />
        <Scene
          title="Detalle de la tienda"
          key="storeDetails"
          component={StoresDetails}
          hideNavBar={true}
        />
        <Scene
          title="Felicidades"
          key="congratulationsView"
          component={CongratulationsView}
        />
        <Scene
          title="Seleccionar País"
          key="countrySelect"
          component={CountrySelect}
          hideNavBar={true}
        />
        <Scene
          title="Disponibilidad de productos"
          key="selectedStore"
          component={SelectedStore}
          hideNavBar={true}
        />
        <Scene
          title="Seguimiento de pedido"
          key="orderTracking"
          component={OrderTracking}
          hideNavBar={true}
        />

        <Scene
          title="Actualizar Perfil"
          key="updateProfile"
          component={UpdateProfile}
          hideNavBar={true}
        />
        <Scene
          title="Mis Puntos"
          key="myPoints"
          component={MyPoints}
          hideNavBar={true}
        />
        <Scene
          title="Buscar tienda"
          key="searchStores"
          component={SearchStores}
          hideNavBar={true}
        />
        <Scene
          title="Calificación de la orden"
          key="orderQualification"
          component={OrderQualification}
          hideNavBar={true}
        />
        <Scene
          title="Territorio"
          key="territorySelect"
          component={TerritorySelect}
          hideNavBar={true}
        />
      </Modal>
    </Router>
  );
};

export default (props) => (
  <Root>
    <StackRouter {...props} />
  </Root>
);
