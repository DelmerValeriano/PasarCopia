import React from "react";
import { View } from "react-native";
import Markdown from "react-native-markdown-package";
import { styles, markdownStyle } from "./styles";

const MarkdownContent = ({ content }) => {
  return (
    <View style={styles.container}>
      <Markdown styles={markdownStyle.collectiveMd}>{content}</Markdown>
    </View>
  );
};

export default MarkdownContent;
