
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { globalStyles } from '../../../config/theme/Theme';
import {
  Download,
  Form,
  ListForm,
  Profesores,
  Person,
  Set,
} from '../../icons/Icons';

import StudentRegistrationModal from '../../components/ui/AddU';
import FloatingActionButton from '../../components/ui/FloatingButton';

import { HOST_URL } from '../../../../web/env.web';
import styles from './style';

import Logo from '../../assets/logo.svg?url';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
}

export const AdminScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [students] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(
          `${HOST_URL}/api/users/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userRole = await AsyncStorage.getItem('role');

        setIsAdmin(userRole === 'admin');
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');

      navigation.navigate('Landing');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!isAdmin) {
    return (
      <View style={[
        globalStyles.mainContainer,
        { justifyContent: 'center', alignItems: 'center' }
      ]}>
        <Text style={styles.errorText}>
          No tienes permiso para acceder a esta pantalla
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.mainContainer}>

      <View style={[
        globalStyles.header2,
        { paddingTop: insets.top }
      ]}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={styles.title2}>
            Yoga Ashram
          </Text>
        </View>

        <View style={globalStyles.profileImageContainer}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            } as any}
          >
            <Set color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <FloatingActionButton
        onPress={() => setModalVisible(true)}
        top={90}
      />

      <StudentRegistrationModal
        visible={modalVisible}
        data={students}
        onClose={() => setModalVisible(false)}
      />

      <View style={styles.container}>

        <View style={[
          styles.overlay,
          { width: '100%', height: '30%' }
        ]}>
          <Image
            source={{ uri: Logo }}
            style={{ width: 200, height: 150 }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Asignacion')}
          >
            <Form />
            <Text style={styles.buttonText}>
              Asignación de Planes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Activación')}
          >
            <Person />
            <Text style={styles.buttonText}>
              Usuarios Activos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AttendanceListScreen')}
          >
            <ListForm />
            <Text style={styles.buttonText}>
              Listas de Asistencia
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profesores')}
          >
            <Profesores />
            <Text style={styles.buttonText}>
              Profesores
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Role')}
          >
            <Profesores />
            <Text style={styles.buttonText}>
              Roles APP
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Excel')}
        >
          <Download />
          <Text style={styles.buttonText2}>
            EXCEL
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default AdminScreen;
