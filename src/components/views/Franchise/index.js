import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import wrappedView from "../../../WrappedView";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "./../../atoms";
import { THEME } from "../../../styles";
import { Actions } from "react-native-router-flux";

let arrayItem = [
  {
    key: 1,
    name: "¿Por qué deberías franquiciar?",
    icon: "ios-arrow-forward",
    url: "https://franquicias.tiendaspronto.com/porque-franquiciar",
  },
  {
    key: 2,
    name: "¿Por qué Pronto?",
    icon: "ios-arrow-forward",
    url: "https://franquicias.tiendaspronto.com/porque-pronto",
  },
  {
    key: 3,
    name: "Nuestra marca",
    icon: "ios-arrow-forward",
    url: "https://franquicias.tiendaspronto.com/nuestra-marca",
  },
];
const Franchise = () => {
  const [isLoading, setIsLoaing] = useState(false);

  return (
    <View style={styles.root}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <ImageBackground
            source={require("./../../../imgs/franchise.jpeg")}
            style={styles.image}
            resizeMode="stretch"
          >
            <View style={styles.containerText}>
              <Text style={styles.text}>
                ¿Quisieras formar parte de una franquicia?
              </Text>
            </View>
          </ImageBackground>

          <View>
            {arrayItem.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.rootUser}
                  onPress={() => {
                    Actions.WebViewFranchise({ url: item.url });
                  }}
                  key={item.key}
                >
                  <View style={styles.col1}>
                    <View>
                      <Text style={styles.textInformation}>{item.name}</Text>
                    </View>
                  </View>
                  <View style={styles.col2}>
                    <Icon style={styles.icon} name={item.icon} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Button
        title="Aplicar ahora"
        height={60}
        disabled={isLoading}
        borderRadius={0}
        marginTop={0}
        event={() => {
          Actions.WebViewFranchise({
            url: "https://franquicias.tiendaspronto.com/aplica-ahora",
          });
        }}
        background={THEME.pronto.green}
      />
    </View>
  );
};

const franchiseConfig = { showHeader: true };

export default wrappedView(Franchise, franchiseConfig);
