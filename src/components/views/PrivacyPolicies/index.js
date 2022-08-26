import React from "react";
import { View, ScrollView } from "react-native";
import { PoliciesAndTerms } from "../../molecules";
import wrappedView from "../../../WrappedView";
import { content } from "../../../static/privacyPolicies";
import styles from "./styles";

const PrivacyPolicies = () => {
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

const privacyPoliciesConfig = { showHeader: true };

export default wrappedView(PrivacyPolicies, privacyPoliciesConfig);
