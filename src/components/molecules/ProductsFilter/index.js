import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, RoundedButton } from "./../../atoms";
import styles from "./styles";

const ProductsFilter = ({
  onPressInput,
  onPresButton,
  onChangeInputValue,
  hideOptions,
  statefilter,
}) => {
  const input = (
    <Input
      placeholder="Cuéntanos, ¿qué buscas?"
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
      <View style={styles.filtersCol2}>
        {!hideOptions && (
          <RoundedButton
            name="tune"
            borderRadius={20}
            radius={50}
            event={onPresButton}
          />
        )}
      </View>
    </View>
  );
};

export default ProductsFilter;
