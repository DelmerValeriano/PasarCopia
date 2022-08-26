import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { THEME } from "./../../../styles";
import styles from "./styles";

const Card = ({
  index,
  name,
  image,
  event,
  color,
  invisible,
  backgroundActive,
  background,
}) => {
  const onPress = () => {
    event(index);
  };

  return invisible ? null : backgroundActive ? (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        style={styles.container}
        source={{
          uri: background,
        }}
        imageStyle={{ borderRadius: 15 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.box, backgroundColor: color }}>
        <Text
          style={{
            ...styles.name,
            color: THEME.generalCategories.restrictedWhite.includes(
              color.toUpperCase()
            )
              ? "#000000"
              : "#FFFFFF",
          }}
        >
          {name.toUpperCase()}
        </Text>
        <View style={styles.backgroundTextContainer}>
          <View style={styles.backgroundTextBox}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"clip"}
              style={{
                ...styles.nameBigger,
                color,
                textShadowColor: THEME.generalCategories.restrictedWhite.includes(
                  color.toUpperCase()
                )
                  ? "#000000"
                  : "#FFFFFF",
                // fontSize: (100 / name.length) * 8, //Cristian: Si se desea que salga el nombre completo en el background de la categoría, desbloquear esta línea.
              }}
            >
              {name.toUpperCase()}
            </Text>
          </View>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
