import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

const Web_View = ({ ThreeDSHTML, action }) => {
  const [visible, setVisible] = useState(true);

  const onMessage = (event) => {
    action(event.nativeEvent.data);
  };

  const ActivityIndicatorElement = () => {
    return (
      <ActivityIndicator
        color="green"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };

  return (
    <View style={styles.webView}>
      {visible && <ActivityIndicatorElement />}
      <WebView
        javaScriptEnable={true}
        source={{ html: ThreeDSHTML }}
        onMessage={onMessage}
        style={{ marginTop: 20, marginHorizontal: 10 }}
        textZoom={100}
        onLoadStart={() => {
          setVisible(true);
        }}
        onLoad={() => {
          setVisible(false);
        }}
      />
    </View>
  );
};

export default Web_View;
