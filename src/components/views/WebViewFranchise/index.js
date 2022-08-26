import React from "react";
import { WebView } from "react-native-webview";
import wrappedView from "../../../WrappedView";

const WebViewFranchise = ({ url }) => {
  return (
    <WebView
      source={{
        uri: url,
      }}
    />
  );
};
const WebViewFranchiseConfigView = {
  showHeader: true,
  showShoppingCart: false,
  isForm: false,
};

export default wrappedView(WebViewFranchise, WebViewFranchiseConfigView);
