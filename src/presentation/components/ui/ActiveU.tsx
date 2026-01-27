import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa íconos
import Communications from 'react-native-communications'; // Para enviar correos
import { Clock, Form, WhatsApp } from '../../icons/Icons';
import { Email } from '../../icons/Icons';
import { HOST_URL } from '../../../../utils/envconfig';
import stylesAdmin from './styles/stylesAdmin';
import { style } from '../../screens/landing/style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
  phonenumber: string;
  role: string;
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
        const response = await axios.get(`${HOST_URL}/api/users/users`, {
          headers: { 'Authorization': 'Bearer ' + token }
        });

        // Filtrar usuarios con rol 'user'
        const usersWithRoleUser = response.data.filter((user: User) => user.role === 'user');

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

  if (loading) {
    return (
      <View style={stylesAdmin.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const sendWhatsAppMessage = (phonenumber: string) => {
    const message = "Hola, te invitamos a activar un plan de clases en nuestra plataforma.";
    const url = `whatsapp://send?phone=${phonenumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      alert("Asegúrate de tener WhatsApp instalado");
    });
  };

  const sendEmail = (email: string) => {
    const subject = "Activa tu plan de clases";
    const body = "Hola, te invitamos a activar un plan de clases en nuestra plataforma.";
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url)
      .catch(() => {
        alert("No se pudo abrir la aplicación de correo. Asegúrate de tener una aplicación de correo configurada.");
      });
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
    <View style={stylesAdmin.container}>
      <TextInput
        style={stylesAdmin.searchInput}
        placeholder="Buscar usuarios..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={user => user._id}
        renderItem={({ item }) => (
          <View style={[stylesAdmin.userContainer, {flexDirection:'row'}]}>
            <View style={{borderWidth:0, height:'100%', width:'85%',}}>
              <View style={stylesAdmin.header}>
                <View style={[stylesAdmin.statusDot, { backgroundColor: item.plan === 'No tienes un plan' ? 'gray' : 'green' }]} />
                <Text style={[stylesAdmin.userName, {color: item.plan === 'No tienes un plan' ? 'gray': 'green'}]}>{item.name}</Text>
              </View>
                <View style={[stylesAdmin.badgeEmailActiveU]}>
                  <Email color='#000'/>
                <Text style={stylesAdmin.userText}>{item.email}</Text>
              </View>
              <View style={{  flexDirection:'row', justifyContent:'center', alignItems:'center', gap:5}}>
              <View style={stylesAdmin.badgePlanActiveU}>
                {item.plan !== 'No tienes un plan' && 
                  <Form color='green' size={20}/>
                }
                <Text style={[stylesAdmin.userText,{color:item.plan !== 'No tienes un plan'?"green":'#000'}]}>{item.plan}</Text>
              </View>
              {item.plan !== 'No tienes un plan' && 
              <View style={stylesAdmin.badgeDias}>
                <Clock/>
                <Text style={stylesAdmin.userText}> {item.planDuration} días</Text>
              </View>}
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <TouchableOpacity style={stylesAdmin.whatsappButton} onPress={() => sendWhatsAppMessage(item.phonenumber)}>
                  <WhatsApp />
                  {/* <Text style={stylesAdmin.buttonText}>WhatsApp</Text> */}
                </TouchableOpacity><TouchableOpacity style={stylesAdmin.whatsappButton2} onPress={() => sendEmail(item.email)}>
                    <Email />
                    {/* <Text style={stylesAdmin.buttonText}>Email</Text> */}
                  </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor:item.plan === 'No tienes un plan' ? '#ff0000ff' : '#25D366',
                height: '100%',
                width: '10%',
                backgroundColor: '#FFF',
                borderRadius: 10,
                justifyContent: 'center',

              }}
            >
             

              <Text
                style={{
                  borderWidth:0,
                  width:180,
                  fontFamily:'Quicksand-Bold',
                  textAlign:'center',
                  alignSelf:'center',
                  fontSize: 15,
                  color: item.plan === 'No tienes un plan' ? '#ff0000ff' : '#25D366',
                  transform: [{ rotate: '-90deg' }],
                }}
              >
                {item.plan === 'No tienes un plan' ? 'INACTIVO' : 'ACTIVO'}
              </Text>
            </View>

          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
};



export default ActiveU;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
