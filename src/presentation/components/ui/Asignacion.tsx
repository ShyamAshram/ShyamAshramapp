import React, { useState, useEffect, SetStateAction } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { HOST_URL } from '../../../../utils/envconfig';
import stylesAdmin from './styles/stylesAdmin';
import { Clock, Email, Form, Person } from '../../icons/Icons';

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
        const response = await axios.get(`${HOST_URL}/api/users/users`, {
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
    return <Text style={stylesAdmin.errorText}>No tienes permiso para acceder a esta pantalla</Text>;
  }

  const updateUserPlan = async (userId: string, newPlan: string, newDuration: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`${HOST_URL}/api/users/${userId}`, {
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
      <View style={stylesAdmin.loadingContainer}>
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
    <View style={stylesAdmin.containerAsignacion}>
      <TextInput
        style={stylesAdmin.searchInput}
        placeholder="Buscar usuarios..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={{ flex: 1, position: 'relative', zIndex: 0 }}>
        <FlatList
          data={filteredUsers}
          keyExtractor={user => user._id}
          renderItem={({ item, index }) => (
            <View style={[stylesAdmin.userContainerAsignacion,  { zIndex: 1}] }>
                <View style={stylesAdmin.badgeName}>
                  <Text style={stylesAdmin.userText}>{item.name}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', gap:10,}}>
                  <View style={stylesAdmin.badgeEmail}>
                    <Email color='#f80000ff' />
                    <Text style={stylesAdmin.userTextEmail}>{item.email}</Text>
                  </View>
                  <View style={stylesAdmin.badgePlan}>
                    {item.plan !== 'No tienes un plan' && 
                      <Form color= {'green'} size={20}/>
                    }
                    <Text style={[stylesAdmin.userText, {color:item.plan === 'No tienes un plan' ? 'red': 'green'}]}> {item.plan}</Text>
                  </View>
                </View>
              {item.plan !== 'No tienes un plan' && 
                <View style={stylesAdmin.badgeDias}>
                  <Clock/>
                  <Text style={stylesAdmin.userTextDias}>{item.planDuration} días</Text>
                </View>
              } 
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


export default Asignacion;


