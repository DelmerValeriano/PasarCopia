import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const ProfileItem = ({ title, img, icon, event, color }) => {
  const style = { color: color };
  const combineStyles = StyleSheet.flatten([styles.icon, style]);

  return (
    <View style={styles.ContentItems}>
      <TouchableOpacity onPress={event}>
        <View style={styles.ContentItem}>
          <View style={styles.ItemCol1}>
            {icon ? (
              <Icon style={combineStyles} name={icon} />
            ) : (
              <Image style={styles.iconImg} source={img} />
            )}
          </View>
          <View style={styles.ItemCol2}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItem;
