import React from "react";
import { TextInput, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const InputWrapper = ({
  placeholder,
  value,
  icon,
  onChange,
  maxLength,
  keyboardType,
  height = 35,
  editable = true,
  secureTextEntry = false,
  autoCapitalize = autoCapitalize ? autoCapitalize : "characters",
  ...othersInputProps
}) => {
  const input = (
    <TextInput
      style={{ ...styles.input, height }}
      value={value}
      onChangeText={onChange}
      maxLength={maxLength}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      editable={editable}
      secureTextEntry={secureTextEntry}
      placeholder={icon && placeholder}
      {...othersInputProps}
    />
  );

  return (
    <View style={[styles.container, { padding: icon ? 5 : 10 }]}>
      {icon ? (
        <View style={styles.inputWithIconWrapper}>
          <Icon style={styles.icon} name={icon} />
          <View style={styles.alignInput}>{input}</View>
        </View>
      ) : (
        <View style={styles.inputWithLabelWrapper}>
          <Text style={styles.placeholder}>{placeholder}</Text>
          {input}
        </View>
      )}
    </View>
  );
};

export default InputWrapper;
