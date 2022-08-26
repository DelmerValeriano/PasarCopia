import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { ButtonSelect } from "./../../atoms";
import { Actions } from "react-native-router-flux";
import { Textarea } from "native-base";

const SuggestionForm = ({
  updateFormData,
  initialValues,
  updateMessage,
  message,
}) => {
  const itemStore = (item) => {
    updateFormData(item);
  };

  const actionChange = () => {
    Actions.ListStore({ item: itemStore });
  };

  const cardSelectedFormat = () => {
    return initialValues.id ? (
      <>
        <View style={styles.col1}>
          <Image
            style={styles.image}
            source={require("./../../../imgs/ProntoBlack.jpg")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.col2}>
          <Text style={styles.textName}>{initialValues.name}</Text>
        </View>
      </>
    ) : null;
  };

  return (
    <View style={styles.root}>
      <ButtonSelect
        placeholder="Seleccionar una tienda"
        iconName="chevron-down"
        iconSize={20}
        styles={{ height: 60 }}
        children={cardSelectedFormat()}
        event={actionChange}
      />
      <Textarea
        rowSpan={10}
        value={message}
        style={styles.Textarea}
        placeholder="Mensaje"
        onChangeText={(text) => updateMessage(text)}
      />
    </View>
  );
};

export default SuggestionForm;
