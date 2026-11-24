
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HOST_URL } from '../../../../web/env.web';
import BackButton from './BackButton.web';

interface Notifications {
  _id: string;
  title: string;
  description: string;
  date: Date | string;
}

const NotificationUi = () => {
  const insets = useSafeAreaInsets();

  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(
        `${HOST_URL}/api/notifications/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = Array.isArray(response.data) ? response.data : [];

      setNotifications([...data].reverse());
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('No fue posible cargar las notificaciones.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const deleteNotification = async (id: string) => {
    try {
      setDeletingId(id);
      setError('');

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      await axios.delete(`${HOST_URL}/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(previous =>
        previous.filter(notification => notification._id !== id),
      );
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError('No fue posible eliminar esta notificación.');
    } finally {
      setDeletingId(null);
    }
  };

  const renderNotificationItem = ({
    item,
  }: {
    item: Notifications;
  }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>
          {item.title}
        </Text>

        <Text style={styles.notificationDescription}>
          {item.description}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.deleteButton,
          deletingId === item._id && styles.disabledButton,
        ]}
        onPress={() => deleteNotification(item._id)}
        disabled={deletingId === item._id}
        activeOpacity={0.8}
      >
        <Text style={styles.deleteButtonText}>
          {deletingId === item._id ? 'Eliminando...' : 'Eliminar'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.header2,
          { paddingTop: insets.top, justifyContent: 'flex-start' },
        ]}
      >
        <BackButton fallback="HomeScreen" color={"#fff"} />

        <Text style={styles.header}>Notificaciones</Text>
      </View>


      {error !== '' && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5a215e" />
          <Text style={styles.loadingText}>
            Cargando notificaciones...
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.notificationList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay notificaciones de momento
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#fff',
  },
  header2: {
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5a215e',
    borderRadius: 10,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backContainer: {
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  notificationList: {
    padding: 12,
    paddingBottom: 30,
    flexGrow: 1,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#D9A404',
  },
  notificationDescription: {
    color: '#1C495E',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#33AB91',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 85,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 10,
    color: '#5a215e',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#D9A404',
  },
  errorText: {
    color: '#b42318',
    textAlign: 'center',
    padding: 12,
  },
});

export default NotificationUi;
