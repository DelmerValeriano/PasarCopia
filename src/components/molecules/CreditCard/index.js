import React, { useState } from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

const CreditCardVisa = ({
  colors,
  cardName,
  cardNumber,
  cardImage,
  cardDate,
  cardMonth,
  cardYear,
}) => {
  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.containerCard}
        source={cardImage}
        resizeMode="contain"
      >
        <View style={styles.containerCardNumber}>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
        </View>
        <View style={styles.containerDate}>
          <Text style={styles.cardDateTitle}>GOOD{"\n"}THRU</Text>
          <Text style={styles.cardDate}>
            {cardMonth}/{cardYear}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardName}>{cardName}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreditCardVisa;
