
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './presentation/navigator/Navigator';
import 'react-native-gesture-handler';
import app from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';




export const App = () => {
  useEffect(() => {
    requestPermission();

    createChannel();

    messaging()
      .getToken()
      .then(token => {
        console.log('🔥 Token FCM:', token);
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Notificación',
        body: remoteMessage.notification?.body || 'Mensaje recibido',
        android: {
          channelId: 'default',
        },
      });
    });

    return unsubscribe;
  }, []);

  const requestPermission = async () => {
    const settings = await messaging().requestPermission();
  };

  const createChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  };

  async function testFCM() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
    } else {
    }
  }

testFCM();
  return (

        <NavigationContainer>
          <Navigator />
        </NavigationContainer>

  );
};



