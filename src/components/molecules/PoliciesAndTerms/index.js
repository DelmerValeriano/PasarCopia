import React from "react";
import { View } from "react-native";
import { MarkdownContent } from "../../atoms";
// import styles from "./styles";

const PrivacyPolicies = ({ content }) => {
  return (
    <View>
      <MarkdownContent content={content} />
    </View>
  );
};

export default PrivacyPolicies;
