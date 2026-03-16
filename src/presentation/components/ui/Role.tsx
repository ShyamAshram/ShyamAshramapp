import React, { useState, useEffect, SetStateAction } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { HOST_URL } from '../../../../utils/envconfig';
import stylesAdmin from './styles/stylesAdmin';
import { Clock, Email, Form, Person } from '../../icons/Icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
  role: string; 
}

const roles = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Profesor', value: 'profe' },
  { label: 'Usuario', value:'user'},
];
const uniqueRoles = Array.from(new Map(roles.map(p => [p.value, p])).values());

const Role = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [selectedRole, setSelectedRole] = useState<{ [key: string]: string }>({});
  const insets = useSafeAreaInsets();



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
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

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  if (!isAdmin) {
    return (
      <View style={{flex:1, justifyContent:'center'}}>
      <Text style={stylesAdmin.errorText}>
        No tienes permiso para acceder a esta pantalla
      </Text>
      </View>)
  }

  const updateRole = async (userId: string, newRole: string,) => {
    console.log(userId, newRole)
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`${HOST_URL}/api/users/${userId}/change-role`, {
        userId: userId,
        role: newRole
      }, {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user._id === userId) {
            return {
              ...user,
              role: newRole
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
    <View style={[globalStyles.mainContainer, {paddingTop:insets.top}]} >
      <View style={stylesAdmin.containerAsignacion}>
        <TextInput
          maxFontSizeMultiplier={1}
          style={stylesAdmin.searchInput}
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={{ flex: 1, position: 'relative', zIndex: 0 }}>
          <FlatList
            data={filteredUsers}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:100}}
            style={{borderWidth:0, padding:8}}

            keyExtractor={user => user._id}
            renderItem={({ item, index }) => (
              <View style={[stylesAdmin.userContainerAsignacion,  { zIndex: 1}] }>
                  <View style={stylesAdmin.badgeName}>
                    <Text maxFontSizeMultiplier={1} style={stylesAdmin.userText}>{item.name}</Text>
                  </View>
                  <DropDownPicker
                    zIndex={1000}
                    zIndexInverse={3000}
                    listMode='SCROLLVIEW'
                    dropDownDirection='AUTO'
                    open={openDropdowns[item._id] || false}
                    setOpen={getOpenSetter(item._id)} 
                    value={selectedRole[item._id] || item?.role}
                    setValue={(callback) => {
                      const value = typeof callback === 'function' ? callback(selectedRole[item._id]) : callback;
                         updateRole(item._id, value,);
                        setSelectedRole(prev => ({ ...prev, [item._id]: value }));

                    }}
                    items={uniqueRoles}
                    placeholder="Cambio de role"
                    style={{ borderColor: '#5a215e',backgroundColor: '#FFF', borderWidth:3}}
                    dropDownContainerStyle={{  backgroundColor: '#fff',  position: 'absolute', zIndex: 2000, maxHeight:300, }}
                    containerStyle={{ marginBottom: openDropdowns[item._id] ? 140 : 20, position: 'relative', zIndex: 3000,}}
                    textStyle={{fontSize:10, fontFamily:'Quicksand-Bold'}}
                  />
              </View>
            )}
          />
        </View>
      </View>
      </View>
  );
};


export default Role;


