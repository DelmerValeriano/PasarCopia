import React, { useState } from "react";
import { Container, Tab, Tabs, TabHeading, ScrollableTab } from "native-base";
import { View, Text } from "react-native";
import { ProductsGrid } from "../../organisms";
import wrappedView from "./../../../WrappedView";
import styles from "./styles";

const Category = ({
  categories,
  categorySelectedIndex,
  onWillFocus,
  userCountry,
}) => {
  const [currentTab, setCurrentTab] = useState(categorySelectedIndex);

  const onChangeTab = ({ i }) => {
    setCurrentTab(i);
  };

  return (
    <Container style={styles.containerTabs}>
      <Tabs
        initialPage={categorySelectedIndex}
        page={currentTab}
        onChangeTab={onChangeTab}
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        style={styles.containerTabs}
        renderTabBar={() => <ScrollableTab />}
      >
        {categories.map((category, index) => {
          const tabTitle =
            category.name === "Todos los productos" ? "Todos" : category.name;
          return (
            <Tab
              key={category.id + index}
              heading={
                <TabHeading style={styles.tabStyle}>
                  <Text style={styles.textStyle}>{tabTitle}</Text>
                </TabHeading>
              }
              tabStyle={styles.containerTabs}
            >
              <View style={styles.tabContent}>
                <ProductsGrid
                  {...category}
                  categories={categories}
                  emptyList={null}
                  onRefresh={() => {}}
                  onWillFocus={onWillFocus}
                  userCountry={userCountry}
                />
              </View>
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
};
const configView = {
  showHeader: true,
  category: true,
  showShoppingCart: true,
};
export default wrappedView(Category, configView);
