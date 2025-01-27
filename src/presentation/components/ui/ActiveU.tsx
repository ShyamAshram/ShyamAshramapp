import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
  phonenumber: string;
}

const ActiveU = () => {
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
        console.log(response.data)

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const sendMessage = (phonenumber: string) => {
    const message = "Hola, te invitamos a activar un plan de clases en nuestra plataforma.";
    const url = `whatsapp://send?phone=${phonenumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      alert("Asegúrate de tener WhatsApp instalado");
    });
  };

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
            <View style={styles.header}>
              <View style={[styles.statusDot, { backgroundColor: item.plan === 'No tienes un plan' ? 'gray' : 'green' }]} />
              <Text style={styles.userName}>Nombre: {item.name}</Text>
            </View>
            <Text style={styles.userText}>Correo: {item.email}</Text>
            <Text style={styles.userText}>Plan: {item.plan}</Text>
            <Text style={styles.userText}>Duración del Plan: {item.planDuration} días</Text>
            {item.plan === 'No tienes un plan' && (
              <TouchableOpacity style={styles.whatsappButton} onPress={() => sendMessage(item.phonenumber)}>
                <Text style={styles.buttonText}>Enviar mensaje por WhatsApp</Text>
              </TouchableOpacity>
            )}
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
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  userText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  whatsappButton: {
    marginTop: 10,
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: '#ffffff',
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

export default ActiveU;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

