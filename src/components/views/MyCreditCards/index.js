import React, { useState, useEffect } from "react";
import RNSecureKeyStore from "react-native-secure-key-store";
import { View, ScrollView } from "react-native";
import WrappedView from "../../../WrappedView";
import { Actions } from "react-native-router-flux";
import { CreditCardList } from "../../organisms";
import {getUid} from '../../../commons/user'
import { Button } from "../../atoms";
import { THEME } from "../../../styles";
import styles from "./styles";

const MyCreditCards = ({ getCardSelected }) => {
  const [creditCardList, setCreditCardList] = useState([]);
  useEffect(() => {
    getCreditCardList();
  }, []);

  const getCreditCardList = async () => {
    try {
      const cardKey = await RNSecureKeyStore.get(getUid().toString());
      setCreditCardList(JSON.parse(cardKey));
    } catch (error) {}
  };

  const goToRegisterCard = () => {
    Actions.newCreditCard({
      creditCards: creditCardList,
      event: getCreditCardList,
      selectedCreditCardDetail: false,
      getCardSelected,
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <CreditCardList
          creditCardList={creditCardList}
          eventCardListUpdate={getCreditCardList}
          getCardSelected={getCardSelected}
        />
      </ScrollView>
      <View style={styles.containerButton}>
        <Button
          title={"Añadir nueva tarjeta"}
          loading={false}
          event={goToRegisterCard}
          height={60}
          borderRadius={0}
          marginTop={0}
          background={THEME.pronto.green}
          // disabled={creditCardList.length > 0 && getCardSelected ? true : false}
        />
      </View>
    </View>
  );
};

const configWrapper = {
  isForm: false,
  showHeader: true,
  showShoppingCart: true,
};

export default WrappedView(MyCreditCards, configWrapper);
