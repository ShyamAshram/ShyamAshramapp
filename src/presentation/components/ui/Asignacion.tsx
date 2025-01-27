import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
}

const Asignacion = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://10.0.2.2:3001/api/users/users', {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
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

  useEffect(() => {

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  if (!isAdmin) {
    return <Text style={styles.errorText}>No tienes permiso para acceder a esta pantalla</Text>;
  }

  const updateUserPlan = async (userId: string, newPlan: string, newDuration: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`http://10.0.2.2:3001/api/users/${userId}`, {
        plan: newPlan,
        planDuration: newDuration
      }, {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user._id === userId) {
            return {
              ...user,
              plan: newPlan,
              planDuration: newDuration
            };
          }
          return user;
        });
      });
      console.log('Usuario actualizado:', response.data);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={user => user._id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>Nombre: {item.name}</Text>
            <Text style={styles.userText}>Correo: {item.email}</Text>
            <Text style={styles.userText}>Plan: {item.plan}</Text>
            <Text style={styles.userText}>Duración del Plan: {item.planDuration} días</Text>
            <TouchableOpacity style={styles.button} onPress={() => updateUserPlan(item._id, 'Ilimitado', 30)}>
              <Text style={styles.buttonText}>Asignar Plan Ilimitado</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => updateUserPlan(item._id, '4 clases', 4)}>
              <Text style={styles.buttonText}>Asignar Plan 4 clases</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => updateUserPlan(item._id, '1 clase', 1)}>
              <Text style={styles.buttonText}>Asignar Plan 1 clase</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Fondo general de la pantalla
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  userContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff', // Fondo de cada tarjeta de usuario
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userText: {
    fontSize: 16,
    color: '#333333', // Color del texto
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5a215e', // Color del botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: '#ffffff', // Color del texto del botón
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
});

export default Asignacion;
