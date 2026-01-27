import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from "../../../config/theme/Theme";
import { Download, Form, ListForm, Profesores } from '../../icons/Icons';
import StudentRegistrationModal from '../../components/ui/AddU';
import FloatingActionButton from '../../components/ui/FloatingButton';
import { Book, Person,  Set } from '../../icons/Icons';
import { HOST_URL } from '../../../../utils/envconfig';
import styles from './style';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
}

export const AdminScreen = () => {
  const navigation = useNavigation<any>()
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState<User[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // const response = await axios.get('http://192.168.128.12:3001/api/users/users', {
        const response = await axios.get(`${HOST_URL}/api/users/users`, {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        setUsers(response.data);
        setLoading(false);

        const userRole = await AsyncStorage.getItem('role');
        if (userRole === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      // console.log('Token REMOVE')
      navigation.navigate('Landing');
    } catch (error) {
      // console.error('Error al cerrar sesión:', error);
    }
  };

return (
  <SafeAreaView style={globalStyles.mainContainer}>
    {!isAdmin ? (
      <Text style={styles.errorText}>
        No tienes permiso para acceder a esta pantalla
      </Text>
    ) : (
      <>
        <View style={globalStyles.header2}>
          <View style={{alignItems:'center', width:"100%"}}>
            <Text style={styles.title2}>YAPP</Text>
          </View>
          <View style={globalStyles.profileImageContainer}>
            <TouchableOpacity onPress={handleLogout} style={{justifyContent:'center', alignItems:"center"}}>
              <Set color='#fff'/>
            </TouchableOpacity>
          </View>
        </View>

        <FloatingActionButton onPress={() => setModalVisible(true)} />

        <StudentRegistrationModal
          visible={modalVisible}
          data={students}
          onClose={() => setModalVisible(false)}
        />

        <View style={styles.container}>
          <View style={styles.overlay}>
            <Image style={styles.logo} source={require('../../assets/Logo1.png')} />
          </View>
          <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Asignacion")}>
              <Form />
              <Text style={styles.buttonText} >
                Asignación de Planes
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Activación')}>
            <Person />
            <Text style={styles.buttonText}>Usuarios Activos</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AttendanceListScreen")}>
              <ListForm />
              <Text style={styles.buttonText}>Listas de Asistencia</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profesores")}>
            <Profesores />
            <Text style={styles.buttonText}>Profesores</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Excel")}>
            <Download />
            <Text style={styles.buttonText2}>EXCEL</Text>
          </TouchableOpacity>
        </View>
      </>
    )}
  </SafeAreaView> 
);
};




