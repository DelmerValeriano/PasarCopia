import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { THEME } from "./../../../styles";

const ButtonWrapper = ({
  title,
  loading,
  disabled,
  event,
  background = THEME.secondary,
  textColor = THEME.whiteColor,
  height = 45,
  borderRadius = 0,
  marginTop = 15,
  width = "100%",
  style,
  labelStyles,
  iconName,
  subTitle = "",
  colorIcon = THEME.whiteColor,
  sizeIcon = 50,
}) => {
  const buttonStyles = {
    backgroundColor: background,
    height,
    borderRadius,
    marginTop,
    width,
    ...styles.root,
    ...style,
  };
  onPress = () => {
    event();
  };

  return (
    <TouchableOpacity
      disabled={disabled || loading || !event}
      onPress={onPress}
      style={buttonStyles}
    >
      <View style={styles.row}>
        <View style={[styles.col1, styles.centerItems]}>
          <Text style={[styles.title, { color: textColor, ...labelStyles }]}>
            {title}
          </Text>
          {iconName && (
            <Icon
              name={iconName}
              style={styles.icon}
              size={sizeIcon * 0.65}
              color={colorIcon}
            />
          )}
        </View>
        {loading && (
          <View style={[styles.col2, styles.centerItems]}>
            <ActivityIndicator size="small" color={THEME.whiteColor} />
          </View>
        )}
      </View>
      {subTitle !== "" ? (
        <View style={styles.rowSubtitle}>
          <Text style={[styles.subTitle, { color: textColor, ...labelStyles }]}>
            {subTitle}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ButtonWrapper;
