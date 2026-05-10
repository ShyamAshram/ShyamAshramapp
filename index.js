/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.DISMISSED) {
    console.log('Notificación descartada', detail.notification);
  } else if (type === EventType.PRESS) {
    console.log('Notificación presionada', detail.notification);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Notificación recibida en background:', remoteMessage);

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || '📢 Notificación',
    body: remoteMessage.notification?.body || 'Mensaje recibido',
    android: {
      channelId: 'default',
    },
  });
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.ACTION_PRESS) {
    console.log('Acción presionada', detail.notification);
  }
});

AppRegistry.registerComponent(appName, () => App);