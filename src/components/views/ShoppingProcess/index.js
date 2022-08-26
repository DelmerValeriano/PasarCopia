import React, { useState, useEffect, useContext } from "react";
import { View, Alert, Keyboard } from "react-native";
import { ProgressSteps, ProgressStep } from "./../../organisms/ProgressStep";
import wrappedView from "./../../../WrappedView";
import { progressStepsStyle, styles } from "./styles";
import {
  ShippingAddressForm,
  PaymentDetails,
  MakeOrder,
} from "../../organisms";
import {
  validateShippingProcessFormStep1,
  validateShippingProcessFormStep2,
  ageRestrictionValidateOnProducts,
} from "./../../../commons/formValidations";
import { getPersonalInfo } from "./../../../commons/user";
import { Spinner, Success, WebView } from "../../molecules";
import { Actions } from "react-native-router-flux";
import {
  makeOrder,
  makeOrderCard,
  payWayOneTransaction,
  makePreOrder,
  setOrders,
  deletePreOrders,
} from "../../../commons/services";
import { makeDeliveryRequest } from "../../../commons/services/delivery";
import {
  getCartItems,
  getUserDataLocal,
  removeUserDataLocal,
  getLocalUserCountry,
} from "../../../commons/localstorage";
import { getSubtotal } from "../../../commons/processOrder";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import auth from "@react-native-firebase/auth";
import { getIdToken } from "../../../commons/user";
import { getMyPoints } from "./../../../commons/services/myPoints";
import { countryContext } from "../../../contexts/countryProvider";
import { creditCardRegexValidations } from "../../../commons/consts/formaValidations";

const ShoppingProcess = ({
  showAlert,
  storeSelected,
  orderType,
  userAddress,
  resultEstimates,
}) => {
  const { country } = useContext(countryContext);

  const currentUser = getPersonalInfo();
  const [products, setProducts] = useState([]);
  const [showRowButton, setShowRowButton] = useState(true);
  const [enableStep2, setEnableStep2] = useState(false);
  const [enableStep3, setEnableStep3] = useState(false);
  const [completeShippingProcess, setCompleteShippingProcess] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ThreeDSHTML, setThreeDSHTML] = useState("");
  const [orderNumber, setOrderNumber] = useState({ value: "" });
  const [labelLoadingPay, setLabelLoadingPay] = useState("Procesando");
  const [counterOrders, setCountersOrders] = useState(0);
  const [shippingDetail, setShippingDetail] = useState({
    step1: {
      shippingPlace: {
        fullAddrress: null,
        addressType: null,
      },
      shippingOwner: {
        email: currentUser.email !== undefined ? currentUser.email : null,
        name: null,
        phone: null,
        rtn: null,
        nameRtn: "",
      },

      orderNotes: null,
      timeOfArrival: null,
    },
    step2: {
      cash: {
        active: null,
        needReturned: {
          bool: null,
          value: "",
        },
      },
      card: {
        active: null,
        card: null,
      },
      points: {
        active: null,
        enoughPoints: false,
        needPoints: {},
        needReturned: {},
      },
      codePromotional: null,
    },
    transaction: {
      OrderID: null,
    },
    orderType,
    storeId: storeSelected.id,
    deliveryOrder: {},
    shippingCost:
      orderType === "delivery"
        ? country === "honduras"
          ? resultEstimates?.driver?.finalAmount
          : country === "el-salvador"
          ? resultEstimates?.data?.rate
          : 0
        : 0,
    storeName: storeSelected.name,
    storePhone: storeSelected.phone,
  });

  const subtotal = getSubtotal(products);
  const shippingCost =
    orderType === "delivery"
      ? country === "honduras"
        ? resultEstimates?.driver?.finalAmount
        : country === "el-salvador"
        ? resultEstimates?.data?.rate
        : 0
      : 0;

  const _keyboardDidShow = () => {
    setShowRowButton(false);
  };

  const _keyboardDidHide = () => {
    setShowRowButton(true);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  }, []);

  useEffect(() => {
    dataLocal();
    getCart();
  }, []);

  const dataLocal = async () => {
    setLabelLoadingPay("Cargando...");
    setLoadingPay(true);

    const userCountry = await getLocalUserCountry();
    let res = await getMyPoints(await getIdToken(), userCountry);

    const { name, phone, rtn, nameRtn, note, time } = await getUserDataLocal();
    setShippingDetail((prevState) => ({
      ...prevState,
      step1: {
        shippingPlace: shippingDetail.step1.shippingPlace,
        shippingOwner: {
          email: currentUser.email !== undefined ? currentUser.email : null,
          name: name
            ? name
            : currentUser?.fullName
            ? currentUser?.fullName
            : "",
          phone: phone
            ? phone
            : currentUser.phone !== undefined
            ? currentUser.phone
            : null,
          rtn,
          nameRtn: nameRtn ? nameRtn : "",
        },

        orderNotes: note ? note : null,
        timeOfArrival: time ? time : null,
      },
      step2: {
        cash: {
          active: false,
          needReturned: {
            bool: null,
            value: "",
          },
        },
        card: {
          active: false,
          card: null,
        },
        points: {
          active: null,
          enoughPoints: false,
          needPoints: res.points,
          needReturned: {},
        },
        codePromotional: null,
      },
    }));

    setLabelLoadingPay("Procesando...");
    setLoadingPay(false);
  };
  const getCart = async () => {
    setProducts(await getCartItems());
  };

  const updateShippingDetailStep1 = (values) => {
    shippingDetail.step1 = values;
    setShippingDetail(shippingDetail);
  };

  const updateShippingDetailStep2 = (values) => {
    shippingDetail.step2 = values;
    setShippingDetail(shippingDetail);
  };

  const updatePhoneNumber = async (phoneNumber) => {
    if (!currentUser.phone) {
      let personalInfo = {
        ...currentUser,
        phone: phoneNumber,
      };
      try {
        await auth().currentUser.updateProfile({
          displayName: JSON.stringify(personalInfo),
        });
      } catch (error) {}
    }
  };

  const goToStep2 = async () => {
    let message = validateShippingProcessFormStep1(
      shippingDetail.step1,
      orderType,
      country
    );
    if (message === "") {
      await updatePhoneNumber(shippingDetail.step1.shippingOwner.phone);
      setEnableStep2(true);
    } else {
      showAlert("Importante", message);
    }
  };

  const goToStep3 = () => {
    const message = validateShippingProcessFormStep2(shippingDetail.step2);
    const cashPay = shippingDetail.step2.cash.active
      ? shippingDetail.step2.cash.needReturned.bool
        ? shippingDetail.step2.cash.needReturned.value
        : 0
      : 0;

    const pointsCash = shippingDetail.step2.points.active
      ? shippingDetail.step2.points.needReturned.money
      : 0;

    if (message) {
      showAlert("Importante", message);
    } else {
      if (cashPay) {
        if (cashPay < subtotal + shippingCost - pointsCash) {
          showAlert(
            "Importante",
            `El monto del efectivo con el que pagará debe ser mayor o igual a  ${formatCurrency(
              subtotal + shippingCost - pointsCash
            )}`
          );
        } else {
          setEnableStep3(true);
        }
      } else {
        setEnableStep3(true);
      }
    }
  };

  const pay = () => {
    const ageRestriction = ageRestrictionValidateOnProducts(products);
    let messageAlert;
    if (
      (ageRestriction && shippingDetail.step2.card.active) ||
      ((orderType === "pick" || orderType === "delivery") &&
        shippingDetail.step2.card.active)
    ) {
      messageAlert =
        "Deberá presentar su identificación y la tarjeta de crédito o débito al momento de recibir el pedido.\n¿Desea realizar el pedido?";
    } else if (ageRestriction) {
      messageAlert =
        "Deberá presentar su identificación al momento de recibir el pedido.\n¿Desea realizar el pedido?";
    } else {
      messageAlert = "¿Desea realizar el pedido?";
    }

    Alert.alert(
      "Confirmar",
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
            setLoadingPay(true);
            await checkOrder();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const checkOrder = async () => {
    if (!shippingDetail.step2.points.enoughPoints) {
      if (shippingDetail.step2.cash.active) {
        const status = await makeOrder(shippingDetail);

        if (status) {
          setCompleteShippingProcess(true);
          setShowRowButton(false);
          goHome();
        } else {
          showAlert("Error", "Se produjo un error al procesar la compra.");
        }
        setLoadingPay(false);
      } else {
        if (counterOrders === 0) {
          if (shippingDetail.step2.card.card.cardNumber[0] === "3") {
            //Cristian: condición que hace que se siga el flujo de 3DS
            /*    const authResponse = (
            await makeOrderCard(shippingDetail, setOrderNumber, orderNumber)
          ).AuthorizeResponse;
          await saveResult(
            JSON.stringify({
              ...authResponse,
              ...authResponse.CreditCardTransactionResults,
            })
          ); */
            showAlert("Error", creditCardRegexValidations.cardNumber);
          } else {
            if (country === "el-salvador") {
              await specialTransaction();
            } else if (country === "honduras") {
              setShowRowButton(false);
              const resMakeOrderCard = await makeOrderCard(
                shippingDetail,
                setOrderNumber,
                orderNumber
              );
              if (resMakeOrderCard.includes("<ResponseCode>4</ResponseCode>")) {
                setLoadingPay(false);
                return showAlert(
                  "Error",
                  "Ocurrió un error al procesar su pedido.\nPara mayor información, comuníquese a Tiendas Pronto."
                );
              }

              setThreeDSHTML(resMakeOrderCard);
              setLoadingPay(false);
            }

            setModalVisible(true);
          }

          await removeUserDataLocal();
        }
      }
    } else {
      await specialTransaction();
      setLoadingPay(false);
    }
  };

  const goHome = () => {
    Actions.congratulationsView({});
  };

  const saveResult = async (data) => {
    setLoadingPay(true);
    const result = JSON.parse(data);

    if (result.ResponseCode === "1") {
      if (
        result.OrderID === orderNumber.value ||
        result.OrderNumber === orderNumber.value
      ) {
        shippingDetail.transaction.OrderID = result.OrderID
          ? result.OrderID
          : result.OrderNumber;
        shippingDetail.transaction.AuthCode = result.AuthCode;
        shippingDetail.transaction.PaddedCardNo = result.PaddedCardNo;
        shippingDetail.transaction.ReferenceNo = result.ReferenceNo;
        await specialTransaction();
      }
      setModalVisible(false);
    } else {
      setModalVisible(false);
      setTimeout(() => {
        showAlert(
          "Error",
          "Hubo un error al procesar su transacción.\nPara mayor información, comuníquese con el banco proveedor de su tarjeta o verifique los datos de la misma."
        );
      }, 300);
    }
    setLoadingPay(false);
  };

  const specialTransaction = async () => {
    try {
      if (orderType === "delivery") {
        const providerDelivery = country === "honduras" ? "ocho" : "urbano-now";
        const parametersMakeDeliveryRequest = await makeDeliveryRequest(
          storeSelected,
          orderType,
          userAddress,
          resultEstimates,
          { ...currentUser, ...shippingDetail.step1.shippingOwner },
          providerDelivery,
          shippingDetail.step1.orderNotes,
          shippingDetail.transaction.OrderID,
          ageRestrictionValidateOnProducts(products)
        );

        shippingDetail.deliveryOrder = {};
        shippingDetail.shippingCost =
          orderType === "delivery"
            ? country === "honduras"
              ? resultEstimates?.driver?.finalAmount
              : country === "el-salvador"
              ? resultEstimates?.data?.rate
              : 0
            : 0;
        const newOrderId = null;
        if (country === "honduras") {
          await finishOrder(parametersMakeDeliveryRequest, newOrderId);
        } else if (country === "el-salvador") {
          await preOrder(parametersMakeDeliveryRequest, newOrderId);
        }
      } else {
        if (country === "honduras") {
          await finishOrder();
        } else if (country === "el-salvador") {
          if (!shippingDetail.step2.points.enoughPoints) {
            await preOrder();
          } else {
            await finishOrder();
          }
        }
      }
      setCountersOrders(1);
    } catch (error) {
      setCountersOrders(0);
      await finishOrder();
      setModalVisible(false);
      setTimeout(() => {
        showAlert(
          "Error",
          "Ocurrió un error al asignar su pedido a un repartidor.\nPara mayor información, comuníquese a Tiendas Pronto."
        );
      }, 3000);
    }
  };

  const finishOrder = async (
    parametersMakeDeliveryRequest = null,
    newOrderId = null
  ) => {
    try {
      const status = await makeOrder(
        shippingDetail,
        newOrderId,
        parametersMakeDeliveryRequest
      );

      if (status) {
        setCompleteShippingProcess(true);
        setShowRowButton(false);
        goHome();
        setModalVisible(false);
      } else {
        setModalVisible(false);
        setTimeout(() => {
          showAlert(
            "Error",
            "Ocurrió  cun error al procesar su pedido.\nPara mayor información, comuníquese a Tiendas Pronto."
          );
        }, 300);
      }
    } catch (error) {
      setModalVisible(false);
      setTimeout(() => {
        showAlert(
          "Error",
          "Ocurrió un error al procesar su pedido.\nPara mayor información, comuníquese a Tiendas Pronto."
        );
      }, 3000);
    }
  };

  const preOrder = async (
    parametersMakeDeliveryRequest = null,
    newOrderId = null
  ) => {
    try {
      const resMakePreOrder = await makePreOrder(shippingDetail, newOrderId);

      if (resMakePreOrder.success) {
        const res = await payWayOneTransaction(shippingDetail);

        if (res.success) {
          await handlefinishOrder(
            res,
            resMakePreOrder.orderId,
            parametersMakeDeliveryRequest
          );
        } else {
          setTimeout(() => {
            showAlert(
              "Error",
              "Hubo un error al procesar su transacción.\nPara mayor información, comuníquese con el banco proveedor de su tarjeta o verifique los datos de la misma."
            );
          }, 300);
          setModalVisible(false);
          setLoadingPay(false);
          await deletePreOrders(
            resMakePreOrder.orderId,
            resMakePreOrder.pointsAssigned
          );
          //aca debemos elminar  el preguardado
        }
      } else {
        setModalVisible(false);
        setLoadingPay(false);
        setTimeout(() => {
          showAlert(
            "Error",
            "Ocurrió un error al procesar su pedido.\nPara mayor información, comuníquese a Tiendas Pronto."
          );
        }, 300);
      }
    } catch (error) {
      setModalVisible(false);
      setLoadingPay(false);
      setTimeout(() => {
        showAlert(
          "Error",
          "Ocurrió un error al procesar su pedido.\nPara mayor información, comuníquese a Tiendas Pronto."
        );
      }, 3000);
    }
  };

  const handlefinishOrder = async (
    paymentDetailFac,
    preOrderId,
    parametersMakeDeliveryRequest
  ) => {
    try {
      const status = await setOrders(
        paymentDetailFac,
        preOrderId,
        parametersMakeDeliveryRequest
      );

      if (status.success) {
        setTimeout(() => {
          setLoadingPay(false);
          setCompleteShippingProcess(true);
          setShowRowButton(false);
          goHome();
          setModalVisible(false);
        }, 300);
      } else {
        setLoadingPay(false);
        setModalVisible(false);
        setTimeout(() => {
          showAlert(
            "Error",
            "Ocurrió un error al procesar su pedido.\nPara mayor información, comuníquese a Tiendas Pronto."
          );
          Actions.homeView();
        }, 300);
      }
    } catch (error) {
      setModalVisible(false);
      setTimeout(() => {
        showAlert(
          "Error",
          "Ocurrió un error al procesar su pedido.\nPara mayor información, comuníquese a Tiendas Pronto."
        );
        Actions.homeView();
      }, 3000);
    }
  };

  return (
    <View style={styles.root}>
      <ProgressSteps {...progressStepsStyle}>
        <ProgressStep
          label="Información de contacto"
          nextBtnTextStyle={styles.buttonTextStyle}
          previousBtnTextStyle={styles.buttonTextStyle}
          nextBtnStyle={styles.nextStepOne}
          onNext={goToStep2}
          nextBtnText="Continuar"
          previousBtnText="Anterior"
          errors={!enableStep2}
          removeBtnRow={!showRowButton}
        >
          <ShippingAddressForm
            initialValues={shippingDetail.step1}
            updateFormData={updateShippingDetailStep1}
            userAddress={userAddress}
            orderType={orderType}
            country={country}
          />
        </ProgressStep>
        <ProgressStep
          label="Método de pago"
          nextBtnTextStyle={styles.buttonTextStyle}
          previousBtnTextStyle={styles.buttonTextStyle}
          nextBtnStyle={styles.nextBtnStyle}
          onNext={goToStep3}
          nextBtnText="Continuar"
          previousBtnText="Anterior"
          errors={!enableStep3}
          removeBtnRow={!showRowButton}
          previousBtnStyle={styles.previousBtnStyle}
          onPrevious={() => {
            setEnableStep2(false);
          }}
        >
          <PaymentDetails
            initialValues={shippingDetail.step2}
            updateFormData={updateShippingDetailStep2}
            shippingCost={shippingCost}
            subtotal={subtotal}
            orderType={orderType}
            showAlert={showAlert}
            country={country}
          />
        </ProgressStep>
        <ProgressStep
          label="Detalle del pedido"
          nextBtnTextStyle={styles.buttonTextStyle}
          previousBtnTextStyle={styles.buttonTextStyle}
          nextBtnStyle={styles.nextBtnStyle}
          previousBtnText="Anterior"
          finishBtnText="Pedir ahora"
          onSubmit={pay}
          previousBtnStyle={styles.previousBtnStyle}
          errors={!completeShippingProcess}
          removeBtnRow={!showRowButton || modalVisible}
          onPrevious={() => {
            setEnableStep2(false);
            setEnableStep3(false);
          }}
        >
          {!completeShippingProcess && !modalVisible && (
            <MakeOrder
              finalAmount={shippingCost}
              orderType={orderType}
              shippingCost={shippingCost}
              subtotal={subtotal}
              products={products}
              storeName={shippingDetail.storeName}
              codePromotional={shippingDetail.step2.codePromotional}
              points={shippingDetail.step2.points}
              cash={shippingDetail.step2.cash}
              card={shippingDetail.step2.card}
            />
          )}

          {modalVisible && (
            <WebView
              modalVisible={modalVisible}
              ThreeDSHTML={ThreeDSHTML}
              action={saveResult}
            />
          )}

          {completeShippingProcess && !modalVisible && (
            <Success message="Orden realizada con éxito" />
          )}
        </ProgressStep>
      </ProgressSteps>

      <Spinner
        visible={loadingPay}
        label={labelLoadingPay}
        overlayColor="#000"
      />
    </View>
  );
};

const ConfigView = {
  showHeader: true,
  isForm: true,
};

export default wrappedView(ShoppingProcess, ConfigView);
