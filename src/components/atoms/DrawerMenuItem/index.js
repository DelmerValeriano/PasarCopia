import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const DrawerMenuItem = ({ title, subTitle, img, icon, event, color }) => {
  const style = { color: color };
  const combineStyles = StyleSheet.flatten([styles.icon, style]);

  return (
    <TouchableOpacity onPress={event}>
      <View style={styles.root}>
        <View style={styles.col1}>
          {icon ? (
            <Icon style={combineStyles} name={icon} />
          ) : (
            <Image style={styles.iconImg} source={img} />
          )}
        </View>
        <View style={styles.col2}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerMenuItem;
