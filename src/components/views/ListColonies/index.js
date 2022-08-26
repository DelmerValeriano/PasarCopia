import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ListItem, CheckBox, Text, Body } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { useColoniesItems } from "../../../hooks/firebase";
import { Spinner } from "./../../molecules";
import wrappedView from "./../../../WrappedView";
import { THEME } from "./../../../styles";
import styles from "./styles";

const ListColonies = ({
  municipalite,
  state,
  rerenderComponent,
  coloniesSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Map());
  const [search, setSearch] = useState("");
  const [colonies, setColonies] = useState([]);
  const [respaldo, setRespaldo] = useState([]);

  useEffect(() => {
    getData();
    const newSelected = new Map(selected);
    newSelected.set(coloniesSelect.id, !selected.get(coloniesSelect.id));
    setSelected(newSelected);
  }, []);

  const getData = async () => {
    const data = await useColoniesItems(state, municipalite);
    setColonies(data);
    setRespaldo(data);
    setLoading(false);
  };

  const onSelect = useCallback(
    (id, title, cost) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
      rerenderComponent(title, id, cost);
      Actions.pop();
    },
    [selected]
  );

  const searchColonies = (e) => {
    const data = respaldo;
    setSearch(e);
    let regex = new RegExp(e, "i");
    let newItems = data.filter((q) => regex.test(q.name));
    setColonies(newItems);
  };

  const Item = ({ id, title, cost, selected, onSelect }) => {
    return (
      <ListItem>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => onSelect(id, title, cost)}
        >
          <Body>
            <Text>{title}</Text>
          </Body>
          <CheckBox
            onPress={() => onSelect(id, title, cost)}
            checked={selected}
          />
        </TouchableOpacity>
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.inputSearch}>
        <View style={styles.iconSearch}>
          <Ionicons
            name="md-search"
            size={25}
            color={THEME.text.defaultColor}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Buscar colonia"
          onChangeText={searchColonies}
        />
      </View>
      <FlatList
        data={colonies}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.name}
            cost={item.shippingCost}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
};
const ConfigView = {
  showHeader: true,
};

export default wrappedView(ListColonies, ConfigView);
