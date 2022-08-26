import React from "react";
import { View, Text, TextInput } from "react-native";
import { getIsAnonymous } from "../../../commons/user";
import styles from "./styles";

const ContactInformation = ({
  subTitle,
  contactPhone,
  contactPersonName,
  contactPersonRtn,
  contactPersonNameRtn,
  contactPersonEmail,
  disabledName,
  disabledPhone,
  disabledRtn,
  disablednameRtn,
  disabledEmail,
  nameValue,
  phoneValue,
  rtnValue,
  nameRtnValue,
  emailValue,
  country,
}) => {
  return (
    <View>
      <View style={styles.separator}>
        <Text style={styles.title}>{subTitle}</Text>
      </View>
      <View style={styles.separator}>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nameValue}
          editable={disabledName}
          onChangeText={contactPersonName}
        />
      </View>

      <View style={styles.separator}>
        {getIsAnonymous() ? (
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={emailValue}
            editable={disabledEmail}
            onChangeText={contactPersonEmail}
          />
        ) : null}
      </View>

      <View style={styles.separator}>
        <TextInput
          value={phoneValue}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Teléfono"
          editable={disabledPhone}
          maxLength={8}
          onChangeText={contactPhone}
        />
      </View>
      <View style={styles.separator}>
        <TextInput
          style={styles.input}
          placeholder={
            country === "honduras"
              ? "RTN (opcional)"
              : country === "el-salvador"
              ? "NIT (opcional)"
              : ""
          }
          keyboardType="numeric"
          value={rtnValue}
          maxLength={
            country === "honduras" ? 14 : country === "el-salvador" ? 9 : 0
          }
          editable={disabledRtn}
          onChangeText={contactPersonRtn}
        />
      </View>
      {rtnValue !== null && rtnValue !== "" ? (
        <View style={styles.separator}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la empresa"
            value={nameRtnValue}
            editable={disablednameRtn}
            onChangeText={contactPersonNameRtn}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ContactInformation;
