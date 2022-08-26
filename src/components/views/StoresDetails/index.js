import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Container, Tab, Tabs, TabHeading } from "native-base";
import { Line } from "./../../atoms";
import wrappedView from "./../../../WrappedView";
import styles from "./styles";
import { getStoreSelect } from "../../../hooks/firebase";

const StoresDetails = ({ store }) => {
  const [tabPage, setTabPage] = useState(0);

  const [state, setState] = useState({
    schedule: store.horaries,
    services: [],
    isLoading: true,
  });
  useEffect(() => {
    const { id } = store;
    setState((prevState) => ({ ...prevState, isLoading: true }));
    updateServicesStore(id);
  }, []);

  const updateServicesStore = async (id) => {
    const storeData = await getStoreSelect(id);
    if (storeData) {
      const { services } = storeData;
      setState((prevState) => ({
        ...prevState,
        services,
        isLoading: false,
      }));
    }
  };

  const onChangeTab = (index) => {
    setTabPage(index);
  };

  const emptyList = (tittle) => (
    <View style={styles.listEmpty}>
      <Text>{`No se han agregado ${tittle} a esta tienda`}</Text>
    </View>
  );

  return (
    <Container>
      <Tabs
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        page={tabPage}
        onChangeTab={(position) => onChangeTab(position.i)}
      >
        <Tab
          heading={
            <TabHeading style={styles.tabStyle}>
              <Text style={styles.textStyle}>Servicios</Text>
            </TabHeading>
          }
        >
          <ScrollView style={styles.root}>
            {state.isLoading ? (
              <ActivityIndicator
                size={Platform.OS === "ios" ? "small" : "large"}
              />
            ) : (
              <View style={styles.card}>
                {state.services.length == 0
                  ? emptyList("servicios")
                  : state.services.map((service, index) => (
                      <View
                        style={{
                          ...styles.container,
                          backgroundColor: service.color,
                        }}
                        key={index}
                      >
                        <View style={styles.avatar}>
                          <Image
                            style={styles.imagen}
                            source={{ uri: service.icon }}
                          />
                        </View>
                        <View style={styles.info}>
                          <Text style={styles.name}>{service.name}</Text>
                        </View>
                      </View>
                    ))}
              </View>
            )}
          </ScrollView>
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tabStyle}>
              <Text style={styles.textStyle}>Horarios</Text>
            </TabHeading>
          }
        >
          <ScrollView style={styles.root}>
            {state.isLoading ? (
              <ActivityIndicator
                size={Platform.OS === "ios" ? "small" : "large"}
              />
            ) : (
              <>
                {state.schedule.length == 0
                  ? emptyList("horarios")
                  : state.schedule.map((orarie, index) => (
                      <View style={styles.containerSchedule} key={index}>
                        <View style={styles.avatarSchedule}>
                          <View style={styles.avatarScheduleCol1}>
                            <Text style={styles.textDay}>{orarie.day}</Text>
                          </View>
                          <View style={styles.avatarScheduleCol2}>
                            <View style={styles.triangle} />
                          </View>
                        </View>
                        <View style={styles.infoSchedule}>
                          <Text
                            style={styles.nameSchedule}
                          >{`${orarie.openingTime} - ${orarie.closeTime}`}</Text>
                        </View>
                      </View>
                    ))}
              </>
            )}
          </ScrollView>
        </Tab>
      </Tabs>
    </Container>
  );
};

const storesDetailsConfigView = {
  showHeader: true,
};

export default wrappedView(StoresDetails, storesDetailsConfigView);
