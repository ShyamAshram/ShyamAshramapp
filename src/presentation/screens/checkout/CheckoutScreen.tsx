import React from 'react';
import { WebView } from 'react-native-webview';

const CheckoutScreen = ({ route, navigation }:any) => {
  const { url } = route.params;

  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes("success")) {
          navigation.replace("PaymentSuccess");
        }
      }}
    />
  );
};

export default CheckoutScreen;