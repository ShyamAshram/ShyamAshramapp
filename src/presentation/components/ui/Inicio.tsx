import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, TextInput, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const Inicio = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
      return;
    }

    try {
      const response = await axios.post('http://192.168.128.15:3001/api/users/login', { email, password });
      const { token, user } = response.data;
      const role = user.role;

      console.log('Axios response:', response.data);
      console.log('User  logged in:', token);
      console.log('Role:', role);

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role);

      // Navegación según el rol del usuario
      switch (role) {
        case 'admin':
          navigation.navigate('Admin');
          break;
        case 'profe':
          navigation.navigate('Prof');
          break;
        default:
          navigation.navigate('HomeScreen');
      }

    } catch (error: any) {
      console.error('Error logging in:', error);

      if (error.response) {
        Alert.alert('Login fallido', error.response.data.error || 'Correo o contraseña incorrectos');
      } else if (error.request) {
        Alert.alert('Error de red', 'No se pudo establecer una conexión con el servidor. Por favor, inténtelo de nuevo más tarde.');
      } else {
        Alert.alert('Error', 'Ha ocurrido un error. Inténtelo nuevamente.');
      }
    }
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image style={style.logo} source={require('../../assets/Logo1.png')} />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={style.input}
        placeholder='Correo Electrónico'
        keyboardType='email-address'
        autoCapitalize='none'
        placeholderTextColor={'#5A215E'}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={style.input}
        placeholder='Contraseña'
        placeholderTextColor={'#5A215E'}
      />
      <TouchableOpacity style={style.button2} onPress={handleLogin}>
        <Text style={style.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    color: 'black'
  },
  button2: {
    marginTop: 20,
    backgroundColor: '#5A215E',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Inicio;
