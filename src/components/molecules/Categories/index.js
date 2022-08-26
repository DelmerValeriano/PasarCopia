import React from "react";
import { Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { ProductsFilter } from "../../molecules";
import { Card } from "../../atoms";
import styles from "./styles";

const Categories = ({ categories }) => {
  const openProducts = (categorySelectedIndex) => {
    Actions.productsView({ categories, categorySelectedIndex });
  };

  const openSearchProductsModal = () => {
    Actions.searchProducts({ categoryId: "", productCategories: categories });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¿Qué estás buscando?</Text>
      <View style={styles.filters}>
        <ProductsFilter
          onPressInput={openSearchProductsModal}
          hideOptions={true}
        />
      </View>
      <View style={styles.card}>
        {categories.map((category, index) => (
          <Card {...category} key={index} event={openProducts} index={index} />
        ))}
      </View>
    </View>
  );
};

export default Categories;
