import React, { useState } from "react";
import { View, Text } from "react-native";
import { RadioSelect, Button } from "../../atoms";
import { THEME } from "../../../styles";
import styles from "./styles";

const TerritoryList = ({ submit, states }) => {
  const [territory, setTerritory] = useState(null);

  const selectTerritory = (item) => {
    setTerritory(item);
  };
  const action = async () => {
    await submit({ territory });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.selectCountryText}>Seleccione su Territorio</Text>
      {states.map((item, index) => (
        <View style={styles.radiosSelectView} key={index}>
          <RadioSelect
            disabled={false}
            item={item}
            selected={item?.id === territory?.id}
            action={selectTerritory}
            styles={styles.radioSelect}
            tittle="zones"
          />
        </View>
      ))}
      <View style={styles.buttonView}>
        <Button
          title={"Continuar"}
          style={{
            backgroundColor: THEME.pronto.yellow,
            ...styles.button,
          }}
          disabled={!territory && true}
          event={action}
          labelStyles={{ fontSize: 20, color: THEME.blackColor }}
        />
      </View>
    </View>
  );
};

export default TerritoryList;
