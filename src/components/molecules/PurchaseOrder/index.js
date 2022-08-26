import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Thumbnail } from "native-base";
import { Line } from "../../atoms";
import { formatCurrency } from "../../../commons/helpers/formatCurrency";
import { THEME } from "../../../styles";
import styles from "./styles";

const PurchaseOrder = ({
  showOrderHistory,
  products,
  total,
  shipping,
  totalDelivery,
  orderType,
  storeName,
  codePromotional,
  points,
  cash,
  card,
}) => {
  let totalApplyingDiscount =
    codePromotional?.code.type === "amount"
      ? total - codePromotional?.code.discount
      : codePromotional?.code.type === "percentage"
      ? total - (total * codePromotional?.code.discount) / 100
      : codePromotional?.code.type === "free shipping"
      ? total - totalDelivery
      : codePromotional?.code.type === "shipping Amount"
      ? total - totalDelivery + codePromotional?.code.discount
      : codePromotional?.code.type === "percentage in shipping"
      ? total - (totalDelivery * codePromotional?.code.discount) / 100
      : total;

  let PointsUsed;
  let paymentWithPoints;
  if (points && cash && card) {
    PointsUsed =
      points?.active && !cash.active && !card.active
        ? (totalApplyingDiscount * points?.needPoints.getPointsValuePoints) /
          points?.needPoints.getPointsValueMoney
        : points?.needPoints.points;

    paymentWithPoints =
      points?.active && !cash.active && !card.active
        ? PointsUsed * points.needPoints.getPointsValueMoney
        : points.needPoints.money;
  }

  useEffect(() => {
    if (orderType === "delivery") {
      products.push({
        name: "Costo de envío",
        commentary: shipping.name,
        code: "000SC",
        price: totalDelivery,
        quantity: 1,
        images: [
          {
            url: require("../../../imgs/shipping.png"),
            local: true,
          },
        ],
      });
    }
    // Esto ayuda a evitar pushear el array.
    if (showOrderHistory) {
      return function cleanUltimatePosition() {
        products.splice(products.length - 1, 1);
      };
    }
  }, [products]);

  return (
    <View>
      {products.length > 0 &&
        products.map((product, index) => (
          <View key={index}>
            {!product.images[0].local && (
              <>
                <View style={styles.root}>
                  <View>
                    <Thumbnail
                      square
                      large
                      source={{
                        uri: product.images[0]
                          ? product.images[0].url
                          : "https://firebasestorage.googleapis.com/v0/b/pronto-mcommerce-dev.appspot.com/o/honduras%2FGxQrMtZG9JUq7ZIxn8Uu%2Fproducts%2FAGUAZUL-7421600309035%2F1597471066389?alt=media&token=8345e055-e890-42e7-baf6-99d0e0a59c27",
                      }}
                    />
                  </View>
                  <View style={styles.detailView}>
                    <View style={styles.quantityView}>
                      <View style={{ flex: 1 }}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={styles.detailText}
                        >
                          {product.name}
                        </Text>

                        {product.commentary ? (
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={styles.commentaryText}
                          >
                            {product.commentary}
                          </Text>
                        ) : null}
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={styles.quantityText}
                        >{`Cantidad: ${product.quantity}`}</Text>
                        {product.ageRestriction ||
                        product.ageRestriction21years ? (
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.textRestriction}
                          >
                            {product.ageRestriction21years
                              ? "+21 años"
                              : "+18 años"}
                          </Text>
                        ) : null}

                        {showOrderHistory &&
                        (!product.ProductExists || !product.enabledInZone) ? (
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.textRestriction}
                          >
                            No disponible
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  <View style={styles.ProductTotalView}>
                    <Text style={styles.ProductTotalText}>
                      {formatCurrency(product.quantity * product.price)}
                    </Text>
                  </View>
                </View>
                <Line
                  style={{
                    backgroundColor: THEME.grayColor,
                    borderWidth: 1,
                    marginVertical: 10,
                  }}
                />
              </>
            )}
          </View>
        ))}
      <View style={styles.descriptionView}>
        <View style={[styles.info]}>
          <Text style={styles.text}>Tienda seleccionada:</Text>
          <Text style={[styles.text, { fontWeight: "bold" }]}>{storeName}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Subtotal:</Text>
          <Text style={styles.text}>
            {formatCurrency(total - totalDelivery)}
          </Text>
        </View>

        {orderType === "delivery" && (
          <View style={styles.info}>
            <Text style={styles.text}>Cargo por entrega:</Text>
            <Text style={styles.text}>{formatCurrency(totalDelivery)}</Text>
          </View>
        )}

        {codePromotional && (
          <View style={styles.info}>
            <Text style={styles.text}>Descuento:</Text>
            <Text style={styles.text}>
              {codePromotional?.code.type === "amount"
                ? formatCurrency(codePromotional.code.discount)
                : codePromotional?.code.type === "percentage"
                ? `${codePromotional?.code.discount}%`
                : codePromotional?.code.type === "free shipping"
                ? "Envío gratis"
                : codePromotional?.code.type === "shipping Amount"
                ? `Envío a ${formatCurrency(codePromotional.code.discount)}`
                : codePromotional?.code.type === "percentage in shipping"
                ? `${codePromotional.code.discount}% en envío`
                : null}
            </Text>
          </View>
        )}

        {points?.active && (
          <>
            <View style={styles.info}>
              <Text style={styles.text}>Puntos a utilizar:</Text>
              <Text style={styles.text}>{PointsUsed}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text}>Pago a realizar con puntos:</Text>
              <Text style={styles.text}>
                {formatCurrency(paymentWithPoints)}
              </Text>
            </View>
          </>
        )}

        {points?.money && points?.points && (
          <>
            <View style={styles.info}>
              <Text style={styles.text}>Puntos utilizados:</Text>
              <Text style={styles.text}>{points.points}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text}>Pago realizado con puntos:</Text>
              <Text style={styles.text}>{formatCurrency(points.money)}</Text>
            </View>
          </>
        )}

        {points?.money && points?.points && (card || cash) && (
          <>
            <View style={styles.info}>
              <Text style={styles.text}>
                {cash
                  ? "Pago a realizar en efectivo"
                  : card
                  ? "Pago realizado con tarjeta"
                  : ""}
                :
              </Text>
              <Text style={styles.text}>
                {formatCurrency(totalApplyingDiscount - points.money)}
              </Text>
            </View>
          </>
        )}

        {points?.active && (cash?.active || card?.active) && (
          <>
            <View style={styles.info}>
              <Text style={styles.text}>
                Pago a realizar{" "}
                {cash.active
                  ? " en efectivo"
                  : card.active
                  ? "con tarjeta"
                  : ""}
                :
              </Text>
              <Text style={styles.text}>
                {formatCurrency(totalApplyingDiscount - paymentWithPoints)}
              </Text>
            </View>
          </>
        )}
        {/* <View style={styles.info}>
          <Text style={styles.text}>Puntos PRONTO:</Text>
          <Text style={styles.text}>{formatCurrency(0)}</Text>
        </View> */}
      </View>
      <View style={styles.TotalView}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalTextNumber}>
          {formatCurrency(totalApplyingDiscount)}
        </Text>
      </View>
      <Line style={styles.line} />
    </View>
  );
};

export default PurchaseOrder;
