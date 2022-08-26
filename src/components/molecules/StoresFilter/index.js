import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Input } from "./../../atoms";
import styles from "./styles";

const StoresFilter = ({ onPressInput, onChangeInputValue }) => {
  const input = (
    <Input
      placeholder="Buscar tienda"
      icon="magnify"
      editable={onPressInput ? false : true}
      pointerEvents={onPressInput && "none"}
      onChange={onChangeInputValue}
      autoFocus={onPressInput ? false : true}
    />
  );
  return (
    <View style={styles.filters}>
      {onPressInput ? (
        <TouchableOpacity onPress={onPressInput} style={styles.filtersCol1}>
          {input}
        </TouchableOpacity>
      ) : (
        <View style={styles.filtersCol1}>{input}</View>
      )}
    </View>
  );
};

export default StoresFilter;
