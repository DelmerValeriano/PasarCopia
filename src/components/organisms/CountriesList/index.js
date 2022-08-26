import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { countries } from "../../../commons/consts/countries";
import { BASE64_PNG } from "../../../commons/consts/images";
import { RadioSelect, Button } from "../../atoms";
import { THEME } from "../../../styles";
import styles from "./styles";

const CountriesList = ({ submit, initialCountry, behavior }) => {
  const [country, setCountry] = useState(initialCountry);
  const selectCountry = (id) => {
    setCountry(id);
  };
  const action = async () => {
    await submit({ country });
  };

  const countryDataFormat = (item) => {
    return (
      <View style={styles.selectView}>
        <Image
          style={{ width: 60, height: 35 }}
          source={{
            uri: `${BASE64_PNG}${item.flag}`,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Text style={styles.selectCountryText}>Seleccione su país</Text>
      {countries.map((item, index) => (
        <View style={styles.radiosSelectView} key={index}>
          <RadioSelect
            disabled={false}
            item={item}
            selected={item.id === country}
            children={countryDataFormat(item)}
            action={selectCountry}
          />
        </View>
      ))}
      <View style={styles.buttonView}>
        <Button
          title={behavior === "select" ? "Seleccionar" : "Continuar"}
          style={{
            backgroundColor: THEME.pronto.yellow,
            ...styles.button,
          }}
          disabled={!country && true}
          event={action}
          labelStyles={{ fontSize: 20, color: THEME.blackColor }}
        />
      </View>
    </View>
  );
};

export default CountriesList;
