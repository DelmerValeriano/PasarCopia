import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { ListItem, Text } from "native-base";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Actions } from "react-native-router-flux";
import { THEME } from "./../../../styles";

const MiniCard = ({ item, event, isStoreCard, source, products, action }) => {
  // Marvin: Lo estructuro de esta manera, por si se desea reutilizar el componente nuevamente.
  const dataReceived = isStoreCard && {
    id: item.id,
    name: item.name,
    description: item.address,
    args: item.coordinates,
    image: item.image,
    services: item.services,
    quantity: item.quantity,
  };
  const { id, name, quantity, args, services } = dataReceived;

  const handleEvent = (item) => {
    if (event !== undefined) {
      event(source ? item : args, id, item);
    } else {
      action(item);
      Actions.pop();
    }
  };

  const goToStore = (store) => {
    Actions.storeDetails({ store });
  };

  return (
    <ListItem thumbnail onPress={() => handleEvent(item)} style={styles.root}>
      {!source ? (
        <>
          <View style={styles.col1}>
            <Image
              source={require("../../../imgs/ProntoBlack.jpg")}
              style={styles.miniImage}
            />
            <View style={styles.contentTittle}>
              <Text style={styles.title}>{name}</Text>
            </View>
          </View>
          <View style={styles.col2}>
            {services !== undefined ? (
              <TouchableOpacity
                onPress={() => goToStore(item)}
                style={styles.scheduleButton}
              >
                <Text note numberOfLines={3} style={styles.textDescription}>
                  Ver horarios y servicios
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.scheduleButton}>
                <Text note numberOfLines={3} style={styles.textDescription}>
                  Ver horarios y servicios
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : source === "pick" || source === "delivery" ? (
        <>
          <View style={styles.brandView}>
            <Image
              source={require("../../../imgs/logos/pronto-logo.png")}
              style={styles.miniImage}
            />
          </View>
          <View style={[styles.col, { flex: 2.5, padding: 10 }]}>
            <Text style={[styles.title, { textAlign: "center" }]}>{name}</Text>
            <View style={styles.descriptionContainer}>
              <Icon
                style={[styles.icon, { marginRight: 5 }]}
                name="map-marker"
              />
              <Text
                style={styles.description}
                numberOfLines={2}
                ellipsizeMode="clip"
              >
                A {(Math.round(item.distance * 100) / 100).toFixed(2)} Km de ti
              </Text>
            </View>
          </View>
          <View style={[{ flex: 1.2 }]}>
            <View
              style={[
                styles.productAvailability,
                {
                  backgroundColor:
                    item.products.length / products.length === 1
                      ? THEME.pronto.green
                      : THEME.pronto.red,
                },
              ]}
            >
              <Text style={styles.productAvailabilityText}>
                {item.products.length}/{products.length} Productos
              </Text>
            </View>
          </View>
        </>
      ) : (
        source === "selectedStore" && (
          <>
            <View style={[styles.col, { flex: 1.5, padding: 0 }]}>
              <View style={styles.imageView}>
                <Image
                  source={{
                    uri: item.images[0]?.url
                      ? item.images[0].url
                      : "https://firebasestorage.googleapis.com/v0/b/pronto-mcommerce-dev.appspot.com/o/honduras%2FGxQrMtZG9JUq7ZIxn8Uu%2Fproducts%2FAGUAZUL-7421600309035%2F1597471066389?alt=media&token=8345e055-e890-42e7-baf6-99d0e0a59c27",
                  }}
                  style={styles.productImage}
                />
              </View>
            </View>
            <View style={[styles.col, { flex: 2.8, padding: 10 }]}>
              <Text style={[styles.title, { textAlign: "center" }]}>
                {name}
              </Text>
              <Text style={[styles.titleQuantity, { textAlign: "center" }]}>
                Cantidad:{quantity}
              </Text>
            </View>
            <View style={[styles.col, { flex: 1.7, padding: 0 }]}>
              <View
                style={[
                  styles.productAvailability,
                  {
                    backgroundColor: item.availableInStore
                      ? THEME.pronto.green
                      : THEME.pronto.red,
                    width: 80,
                    height: 30,
                    alignItems: "flex-end",
                  },
                ]}
              >
                <Text style={styles.productAvailabilityText}>
                  {item.availableInStore ? "Disponible" : "Agotado"}
                </Text>
              </View>
            </View>
          </>
        )
      )}
    </ListItem>
  );
};
export default MiniCard;
