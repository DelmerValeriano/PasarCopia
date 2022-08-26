import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const ProductInformation = ({
  name,
  description,
  ageRestriction,
  ageRestriction21years,
  dataAvailable,
}) => {
  return (
    <View style={styles.information}>
      <View>
        {!dataAvailable && (
          <Text style={styles.textRestriction}>No disponible</Text>
        )}
        <Text style={styles.productName}>{name}</Text>
        {ageRestriction || ageRestriction21years ? (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.textRestriction}
          >
            {ageRestriction21years ? "+21 años" : "+18 años"}
          </Text>
        ) : null}

        <Text style={styles.productDescription}>{description}</Text>
      </View>
    </View>
  );
};

export default ProductInformation;
