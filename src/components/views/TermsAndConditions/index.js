import React from "react";
import { View, ScrollView } from "react-native";
import { PoliciesAndTerms } from "../../molecules";
import wrappedView from "../../../WrappedView";
import { content } from "../../../static/termsAndConditions";
import styles from "./styles";

const TermsAndConditions = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollViewRoot}
    >
      <View style={styles.root}>
        <PoliciesAndTerms content={content} />
      </View>
    </ScrollView>
  );
};

const termsAndConditionsConfig = { showHeader: true };

export default wrappedView(TermsAndConditions, termsAndConditionsConfig);
