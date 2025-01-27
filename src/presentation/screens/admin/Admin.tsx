import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from "../../../config/theme/Theme";


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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://10.0.2.2:3001/api/users/users', {
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

  if (!isAdmin) {
    return <Text style={styles.errorText}>No tienes permiso para acceder a esta pantalla</Text>;
  }



  return (
    <SafeAreaView style={globalStyles.mainContainer2}>
      <View style={globalStyles.header2}>
        <Text style={styles.title2}>YAPP</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Image style={styles.logo} source={require('../../assets/Logo1.png')} />
        </View>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Asignacion')}>Asignación de Planes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Activación')}>
          <Text style={styles.buttonText}>Usuarios Activos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Asistencia')}>
          <Text style={styles.buttonText}>Listas de Asistencia</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',

  },
  button: {
    width: '90%',
    backgroundColor: '#5a215e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 35,
    opacity: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title2: {
    fontSize: 28,
    fontWeight: "bold",
    color: 'white',
    fontFamily: 'Cochin',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  overlay: {

    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '40%'

  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});


