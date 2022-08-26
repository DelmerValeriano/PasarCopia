import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RadioButton } from "../../atoms";
import { CardPayment, CashPayment, Spinner } from "../../molecules";
import { Actions } from "react-native-router-flux";
import DialogInput from "react-native-dialog-input";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import styles from "./styles";
import { getIdToken } from "../../../commons/user";
import { validateCodePromotional } from "./../../../commons/services/promotionalCode";
import { formatCodePromotional } from "../../../commons/consts/consts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PaymentDetails = ({
  initialValues,
  updateFormData,
  subtotal,
  shippingCost,
  orderType,
  total = subtotal + shippingCost,
  showAlert,
  country,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisble] = useState(false);

  const [radiosPaymentOption, setRadiosPaymentOption] = useState({
    card: initialValues.card.active,
    cash: initialValues.cash.active,
  });
  const [radiosNeedReturned, setRadiosNeedReturned] = useState({
    yes: initialValues.cash.needReturned.bool ? true : false,
    not: initialValues.cash.needReturned.bool === false ? true : false,
  });

  const [radiosPointsOption, setRadiosPointsOption] = useState({
    option1: initialValues.points.active ? true : false,
    option2: initialValues.points.active === false ? true : false,
  });

  const [valueInputCash, setValueInputCash] = useState(
    initialValues.cash.needReturned.value
  );
  const [creditCardSelected, setCreditCardSelected] = useState(
    initialValues.card.card
  );

  const [amountPayable, setAmountPayable] = useState(total);
  const [valuePointsSelect, setValuePointsSelect] = useState(null);

  useEffect(() => {
    const { codePromotional } = initialValues;
    const amountPayable =
      codePromotional?.code.type === "amount"
        ? total - codePromotional.code.discount
        : codePromotional?.code.type === "percentage"
        ? total - (total * codePromotional?.code.discount) / 100
        : codePromotional?.code.type === "free shipping"
        ? total - shippingCost
        : codePromotional?.code.type === "shipping Amount"
        ? total - shippingCost + codePromotional?.code.discount
        : codePromotional?.code.type === "percentage in shipping"
        ? total - (shippingCost * codePromotional?.code.discount) / 100
        : total;

    setAmountPayable(amountPayable);
  }, []);

  const changePointsOption = (value, totalPurchase, promoCodeEntry = false) => {
    setValuePointsSelect(value);

    if (value.hasOwnProperty(true)) {
      if (
        initialValues.points.needPoints.points === 0 ||
        initialValues.points.needPoints.points === undefined ||
        initialValues.points.needPoints.points === null
      ) {
        showAlert("Importante", "No cuenta con puntos");
      } else {
        initialValues.points.enoughPoints = false;
        initialValues.points.active = true;
        let totalPoints;
        if (totalPurchase <= initialValues.points.needPoints.money) {
          totalPoints =
            (totalPurchase *
              initialValues.points.needPoints.getPointsValuePoints) /
            initialValues.points.needPoints.getPointsValueMoney;
          initialValues.points.needReturned.money = totalPurchase;
          initialValues.points.needReturned.points = totalPoints;
          initialValues.points.enoughPoints = true;

          if (!promoCodeEntry) {
            initialValues.cash.active = false;
            initialValues.card.active = false;
            setRadiosPaymentOption({ card: false, cash: false });
          }
        } else {
          initialValues.points.needReturned.money =
            initialValues.points.needPoints.money;
          initialValues.points.needReturned.points =
            initialValues.points.needPoints.points;

          if (!promoCodeEntry) {
            initialValues.cash.active = false;
            initialValues.card.active = false;
            setRadiosPaymentOption({ card: false, cash: false });
          }
        }
        updateFormData(initialValues);
        setRadiosPointsOption({ option1: true, option2: false });
      }
    } else {
      initialValues.points.enoughPoints = false;
      initialValues.points.active = false;

      if (!promoCodeEntry) {
        initialValues.cash.active = false;
        initialValues.card.active = false;
        setRadiosPaymentOption({ card: false, cash: false });
      }
      updateFormData(initialValues);

      setRadiosPointsOption({ option1: false, option2: true });
    }
  };

  const changePaymentOption = async (option) => {
    if (option.hasOwnProperty("card")) {
      initialValues.card.active = true;
      initialValues.cash.active = false;
      updateFormData(initialValues);
      setRadiosPaymentOption({ card: true, cash: false });
    } else {
      initialValues.card.active = false;
      initialValues.cash.active = true;
      updateFormData(initialValues);
      setRadiosPaymentOption({ card: false, cash: true });
    }
  };
  const changeNeedReturnedOption = (option) => {
    if (option.hasOwnProperty("yes")) {
      initialValues.cash.needReturned.bool = true;
      updateFormData(initialValues);
      setRadiosNeedReturned({ yes: true, not: false });
    } else {
      initialValues.cash.needReturned.bool = false;
      updateFormData(initialValues);
      setRadiosNeedReturned({ yes: false, not: true });
    }
  };
  const onChangeInputCash = (value) => {
    if (!isNaN(parseInt(value.match(/[0-9]*/gm)[0], 10))) {
      initialValues.cash.needReturned.value = parseInt(
        value.match(/[0-9]*/gm)[0],
        10
      );
      updateFormData(initialValues);
      setValueInputCash(parseInt(value.match(/[0-9]*/gm)[0], 10));
    } else {
      initialValues.cash.needReturned.value = "";
      updateFormData(initialValues);
      setValueInputCash("");
    }
  };

  const getCreditCardList = () => {
    Actions.myCreditCards({ getCardSelected });
  };

  const getCardSelected = (selected) => {
    initialValues.card.card = selected;
    updateFormData(initialValues);
    setCreditCardSelected(selected);
  };

  const openDialog = (isShow) => {
    setIsDialogVisble(isShow);
  };

  const insertPromotionalCode = async (value) => {
    let message = "";
    try {
      if (value === "" || value === null || value === undefined) {
        showAlert("Importante", "El código promocional es requerido\n");
      } else {
        openDialog(false);
        setLoading(true);
        const code = formatCodePromotional(value);
        const token = await getIdToken();
        const res = await validateCodePromotional(
          code,
          token,
          orderType,
          total,
          shippingCost
        );

        if (res.success) {
          const resData = {
            ...res,
            codeValueText: value,
          };

          initialValues.codePromotional = resData;
          updateFormData(initialValues);

          const { type, discount } = res.code;

          const totalWithDiscount =
            type === "amount"
              ? total - discount
              : type === "percentage"
              ? total - (total * discount) / 100
              : type === "free shipping"
              ? total - shippingCost
              : type === "shipping Amount"
              ? total - shippingCost + discount
              : type === "percentage in shipping"
              ? total - (shippingCost * discount) / 100
              : total;
          setAmountPayable(totalWithDiscount);

          changePointsOption({ ...valuePointsSelect }, totalWithDiscount, true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          message =
            Object.entries(res).length === 0
              ? "código promocional inválido"
              : res.message;

          initialValues.codePromotional = null;
          updateFormData(initialValues);
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
              showAlert("Importante", message);
            }, 300);
          }, 1000);
        }
      }
    } catch (error) {
      setTimeout(() => showAlert("Error: ", `${error}`), 200);
    }
  };

  return (
    <View style={styles.root}>
      <View>
        <DialogInput
          isDialogVisible={isDialogVisible}
          title="Ingresa tu código promocional"
          cancelText="Cancelar"
          submitText="Aceptar"
          hintInput="código promocional"
          submitInput={insertPromotionalCode}
          initValueTextInput={
            initialValues.codePromotional
              ? initialValues.codePromotional.codeValueText
              : null
          }
          closeDialog={() => {
            openDialog(false);
          }}
        />
        <View>
          <Text style={styles.title}>
            ¿Desea utilizar sus puntos acumulados?
          </Text>
          <View style={styles.radioButtonsContainer}>
            <RadioButton
              title="Si"
              iconSize={20}
              value={true}
              selected={radiosPointsOption.option1}
              action={changePointsOption}
              total={amountPayable}
            />
            <RadioButton
              title="No"
              iconSize={20}
              value={false}
              selected={radiosPointsOption.option2}
              action={changePointsOption}
              total={amountPayable}
            />
          </View>
          <Text style={styles.text}>{`Actualmente tiene ${
            initialValues.points.needPoints.points
          } puntos acumulados equivalen a ${formatCurrency(
            initialValues.points.needPoints.money
          )}`}</Text>
        </View>
        {((radiosPointsOption.option1 && !initialValues.points.enoughPoints) ||
          radiosPointsOption.option2) && (
          <View style={styles.contentPaymentMethod}>
            <Text style={styles.title}>Método de pago</Text>

            <View style={styles.radioButtonsContainer}>
              <RadioButton
                title="Tarjeta"
                selected={radiosPaymentOption.card}
                iconSize={20}
                value="card"
                action={changePaymentOption}
              />
              {orderType === "pick" && (
                <RadioButton
                  title="Efectivo"
                  selected={radiosPaymentOption.cash}
                  iconSize={20}
                  value="cash"
                  action={changePaymentOption}
                />
              )}
            </View>

            {initialValues.points.active && (
              <Text style={styles.text}>
                {`Para completar el pago le hacen falta ${formatCurrency(
                  amountPayable - initialValues.points.needPoints.money
                )}`}
              </Text>
            )}
          </View>
        )}
      </View>
      {radiosPaymentOption.cash ? (
        <CashPayment
          needReturned={radiosNeedReturned}
          actionChange={changeNeedReturnedOption}
          onChangeInputCash={onChangeInputCash}
          valueInputCash={valueInputCash}
          subtotal={subtotal}
          shippingCost={shippingCost}
          pointsCash={
            initialValues.points.active
              ? initialValues.points.needReturned.money
              : 0
          }
          country={country}
        />
      ) : null}

      {radiosPaymentOption.card ? (
        <CardPayment
          actionChange={getCreditCardList}
          creditCardSelected={creditCardSelected}
        />
      ) : null}

      {initialValues.points.active !== null &&
      initialValues.codePromotional === null ? (
        <TouchableOpacity
          onPress={() => openDialog(true)}
          style={styles.contentCodePromotional}
        >
          <Icon name="ticket" style={styles.IconItem} />
          <Text style={styles.textCodePromotional}>
            Ingresa tu código promocional
          </Text>
        </TouchableOpacity>
      ) : null}
      {initialValues.codePromotional !== null && (
        <TouchableOpacity
          style={styles.contentCodePromotional}
          onPress={() => openDialog(true)}
        >
          <Icon name="ticket" style={styles.IconItem} />
          <Text style={styles.textCodePromotional}>
            Modificar código promocional
          </Text>
        </TouchableOpacity>
      )}

      {initialValues.codePromotional !== null && (
        <>
          <TouchableOpacity style={styles.contentCodePromotional}>
            <Icon name="check-circle-outline" style={styles.IconItem} />
            <Text style={styles.textCodePromotional}>
              Código ingresado: {initialValues.codePromotional?.codeValueText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentCodePromotional}>
            <Icon name="cash" style={styles.IconItem} />
            <Text style={styles.textCodePromotional}>
              Descuento:{" "}
              {initialValues.codePromotional?.code.type === "amount"
                ? formatCurrency(initialValues.codePromotional.code.discount)
                : initialValues.codePromotional?.code.type === "percentage"
                ? `${initialValues.codePromotional?.code.discount}%`
                : initialValues.codePromotional?.code.type === "free shipping"
                ? "Envío gratis"
                : initialValues.codePromotional?.code.type === "shipping Amount"
                ? `Envío a ${formatCurrency(
                    initialValues.codePromotional?.code.discount
                  )}`
                : initialValues.codePromotional?.code.type ===
                  "percentage in shipping"
                ? `${initialValues.codePromotional?.code.discount}% en envío`
                : null}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <Spinner visible={loading} label="" />
    </View>
  );
};

export default PaymentDetails;
