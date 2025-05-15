import React, { useState, useEffect, SetStateAction } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
  role: string; 
}

const Asignacion = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [selectedPlan, setSelectedPlan] = useState<{ [key: string]: string }>({});

const planes = [
  { label: 'Seleccionar plan...', value: '' },
  { label: 'Anualidad (365 días)', value: 'Anualidad' },
  { label: '6 meses', value:'6 meses'},
  { label: '3 meses', value:'3 meses'},
  { label: 'Ilimitado (30 días)', value: 'Ilimitado' },
  { label: '4 clases (4 días)', value: '4 clases' },
  { label: '1 clase (1 día)', value: '1 clase' },
  { label: 'No tienes un plan', value: 'No tienes un plan' },
];
const uniquePlanes = Array.from(new Map(planes.map(p => [p.value, p])).values());

type PlanNombre = 'Anualidad' |'6 meses'|'3 meses' | 'Ilimitado' | '4 clases' | '1 clase' | 'No tienes un plan';

const planesConDuracion: Record<PlanNombre, number> = {
  'Anualidad': 365,
  '6 meses': 186,
  '3 meses':93,
  'Ilimitado': 30,
  '4 clases': 4,
  '1 clase': 1,
  'No tienes un plan': 0
};


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://yapp-production.up.railway.app/api/users/users', {
          headers: { 'Authorization': 'Bearer ' + token }
        });

        // Filtrar usuarios con rol 'user' en el frontend (opcional)
        const usersWithRoleUser = response.data.filter((user: { role: string; }) => user.role === 'user');

        setUsers(usersWithRoleUser);
        setFilteredUsers(usersWithRoleUser);
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
      const response = await axios.put(`https://yapp-production.up.railway.app/api/users/${userId}`, {
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
  const getOpenSetter = (userId: string) => (callback: SetStateAction<boolean>) => {
  setOpenDropdowns(prev => ({
    ...prev,
    [userId]: typeof callback === 'function' ? callback(prev[userId] || false) : callback,
  }));
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuarios..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={{ flex: 1, position: 'relative', zIndex: 0 }}>
        <FlatList
          data={filteredUsers}
          keyExtractor={user => user._id}
          renderItem={({ item, index }) => (
            <View style={[styles.userContainer,  { zIndex: 1}] }>
              <Text style={styles.userText}>Nombre: {item.name}</Text>
              <Text style={styles.userText}>Correo: {item.email}</Text>
              <Text style={styles.userText}>Plan: {item.plan}</Text>
              <Text style={styles.userText}>Duración del Plan: {item.planDuration} días</Text>
              
                <DropDownPicker
                  zIndex={1000}
                  zIndexInverse={3000}
                  listMode='SCROLLVIEW'
                  dropDownDirection='AUTO'
                  open={openDropdowns[item._id] || false}
                  setOpen={getOpenSetter(item._id)} 
                  value={selectedPlan[item._id] || null}
                  setValue={(callback) => {
                    const value = typeof callback === 'function' ? callback(selectedPlan[item._id]) : callback;
                    const duration = planesConDuracion[value as PlanNombre];
                    if (typeof duration === 'number') {
                      updateUserPlan(item._id, value, duration);
                      setSelectedPlan(prev => ({ ...prev, [item._id]: value }));
                    }
                

                  }}
                  items={uniquePlanes}
                  placeholder="Selecciona un plan"
                  style={{ borderColor: '#5a215e',backgroundColor: '#FFF', borderWidth:3}}
                  dropDownContainerStyle={{  backgroundColor: '#fff',  position: 'absolute', zIndex: 2000, maxHeight:600, }}
                  containerStyle={{ marginBottom: openDropdowns[item._id] ? 320 : 20, position: 'relative', zIndex: 3000,}}
                />

              

            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'static',
    padding: 20,
    zIndex:1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#333',
    color: '#333'
  },
  userContainer: {
    flex:1,
    marginBottom: 20,
    zIndex:-1000000,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userText: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5a215e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  button2: {
    marginTop: 10,
    backgroundColor: 'red',
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

export default Asignacion;


