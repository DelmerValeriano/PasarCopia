import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

const HorizontalScroll = ({
  title,
  items,
  child: ItemComponent,
  event,
  onWillFocus,
  userCountry,
}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {items.map((item) => (
            <ItemComponent
              key={item.id}
              {...item}
              event={event}
              item={item}
              onWillFocus={onWillFocus}
              userCountry={userCountry}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HorizontalScroll;
