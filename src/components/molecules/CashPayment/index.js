import React from "react";
import { View, Text } from "react-native";
import { RadioButton, Input } from "../../atoms";
import Icon from "react-native-vector-icons/Ionicons";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import styles from "./styles";
import { COUNTRIES } from "../../../commons/consts/country";

const CashPayment = ({
  needReturned,
  actionChange,
  onChangeInputCash,
  valueInputCash,
  subtotal,
  shippingCost,
  pointsCash,
  country,
}) => {
  return (
    <View>
      <Text style={styles.title}>¿Necesita cambio?</Text>
      <View style={styles.radioButtonsContainer}>
        <RadioButton
          title="Si"
          selected={needReturned.yes}
          iconSize={20}
          value="yes"
          action={actionChange}
        />
        <RadioButton
          title="No"
          selected={needReturned.not}
          iconSize={20}
          value="no"
          action={actionChange}
        />
      </View>
      {needReturned.yes && (
        <View>
          <Text style={styles.title}>
            Ingrese la cantidad con la cual pagará
          </Text>
          <View style={styles.infoView}>
            <Icon style={styles.icon} name="md-information-circle" />
            <View>
              <Text style={styles.infoText}>
                Solo podrá ingresar valores enteros.
              </Text>
              <Text style={styles.infoText}>
                El valor total de su compra es de:{" "}
                {formatCurrency(subtotal + shippingCost - pointsCash)}
              </Text>
            </View>
          </View>
          <View style={styles.numericInputContainer}>
            <Input
              placeholder={COUNTRIES[country].currency.largeFormat}
              keyboardType="numeric"
              onChange={onChangeInputCash}
              value={valueInputCash.toString()}
              maxLength={15}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CashPayment;
