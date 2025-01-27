import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../../../config/theme/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

interface Notifications {
  _id: string;
  title: string;
  description: string;
  date: Date;
}

const NotificationUi = () => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);


  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await axios.get(`http://10.0.2.2:3001/api/notifications/me`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      console.log('Response data:', response.data);

      setNotifications(response.data.reverse());
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };
  const deleteNotification = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      console.log(`Deleting notification with ID: ${id}`);
      const response = await axios.delete(`http://10.0.2.2:3001/api/notifications/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      console.log('Delete response:', response.data);
      setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const renderRightActions = (id: string) => (
    <RectButton style={styles.deleteButton} onPress={() => deleteNotification(id)}>
      <Text style={styles.deleteButtonText}>Eliminar</Text>
    </RectButton>
  );

  const renderNotificationItem = ({ item }: { item: Notifications }) => (
    <Swipeable renderRightActions={() => renderRightActions(item._id)}>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
    </Swipeable>
  );
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header2}>
        <Text style={styles.header}>Notificaciones</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item._id}
        style={styles.notificationList}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    width: '100%'
  },
  header: {

    color: '#FFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#5a215e'
  },
  notificationList: {
    flex: 0,
    width: '100%',

  },
  notificationContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#D9A404'
  },
  notificationDescription: {
    color: '#1C495E',
    fontWeight: 'bold'
  },
  deleteButton: {
    backgroundColor: '#33AB91',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 5,
    height: '90%'
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default NotificationUi;
