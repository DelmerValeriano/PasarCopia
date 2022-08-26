import React from "react";
import { Text, View } from "react-native";
import { RoundedButton } from "../../atoms";
import InputNumeric from "../InputNumeric";
import styles from "./styles";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";

const ProductDetail = ({
  ageRestriction,
  name,
  description,
  price,
  priceDetail,
  decreaceQuanty,
  increaceQuanty,
  quantityProducts,
  existInCart,
  quantity,
  isFavorite,
  eventFavorite,
  eventOpenMap,
  userCountry,
  ageRestriction21years,
}) => {
  const showFavoriteOption = isFavorite !== null;
  return (
    <View>
      <View style={styles.row1}>
        <View style={styles.detailsProduct}>
          <Text style={styles.title}>{name}</Text>
          {ageRestriction || ageRestriction21years ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.textRestriction}
            >
              {ageRestriction21years ? "+21 años" : "+18 años"}
            </Text>
          ) : null}

          <Text style={styles.detailsProductDescription}>{description}</Text>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={styles.col1}>
          <RoundedButton name="magnify" color="gray" event={eventOpenMap} />
          <View style={styles.containerTextWhere}>
            <Text style={styles.textWhere}>¿Dónde puedo encontrarlo?</Text>
          </View>
        </View>
        <View style={styles.col2}>
          {showFavoriteOption && (
            <RoundedButton
              name="heart"
              color={isFavorite ? "red" : "gray"}
              event={eventFavorite}
            />
          )}
        </View>
      </View>

      <View style={styles.priceAndQuantity}>
        <View style={styles.aligCenter}>
          <Text style={styles.textPrice}>{priceDetail}</Text>
          <View style={styles.priceDetails}>
            <Text style={styles.price}>{formatCurrency(price)}</Text>
          </View>
        </View>
        {userCountry === "honduras" || userCountry === "el-salvador" ? (
          <>
            <View style={styles.lineVertical}></View>
            <View style={styles.aligCenter}>
              <Text style={styles.quantity}>Cantidad</Text>
              <InputNumeric
                decreaceQuanty={decreaceQuanty}
                increaceQuanty={increaceQuanty}
                quantity={quantityProducts}
              />
            </View>
          </>
        ) : null}
      </View>
      {userCountry === "honduras" ? (
        <View style={styles.ContentlineHorizontal}>
          <View style={styles.lineHorizontal}></View>
        </View>
      ) : null}
    </View>
  );
};

export default ProductDetail;
