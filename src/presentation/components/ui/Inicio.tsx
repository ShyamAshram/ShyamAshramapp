import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, TextInput, Text, StyleSheet, KeyboardAvoidingView, Platform, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { HOST_URL } from '../../../../utils/envconfig';

export const Inicio = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading]= useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

      setIsLoading(true)
      const response = await axios.post(`${HOST_URL}/api/users/login`, { email, password });
      const { token, user } = response.data;
      const role = user.role;

      console.log('Axios response:', response.data);
      console.log('User  logged in:', token);
      console.log('Role:', role);

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role);

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
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      console.error('Error logging in:', error);

      if (error.response) {
        Alert.alert('Credenciales incorrectas', error.response.data.error || 'Correo o contraseña incorrectos');
      } else if (error.request) {
        Alert.alert('Error de red', 'No se pudo establecer una conexión con el servidor. Por favor, inténtelo de nuevo más tarde.');
      } else {
        Alert.alert('Error', 'Ha ocurrido un error. Inténtelo nuevamente.');
      }
    }
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleUpperCase());
  };
  



  if(isLoading){return(
    <View style={{ position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent', 
      zIndex: 999,}}>
    <ActivityIndicator style={{flex:1}} size="large" color={"#5A215E"}/>
    </View>
  )}
  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image style={style.logo} source={require('../../assets/Logo1.png')} />

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        style={style.input}
        placeholder='Correo Electrónico'
        keyboardType='email-address'
        autoCapitalize='none'
        placeholderTextColor={'#5A215E'}
      />

      {/* Contenedor de contraseña con botón de mostrar */}
      <View style={style.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={style.inputPassword}
          placeholder='Contraseña'
          placeholderTextColor={'#5A215E'}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={style.showPasswordButton}>
          <Text style={{ color: '#5A215E', fontWeight: 'bold' }}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.recoverPass}>
        <TouchableOpacity onPress={() => navigation.navigate('RecuperarContrasena')}>
          <Text style={style.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

    <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={style.button2} onPress={handleLogin}>
        <Text style={style.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
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
  forgotPasswordText: {
    color: '#5A215E',
    fontSize: 12,
    fontFamily:'Quicksand-Bold',
    marginTop: 10,
    textDecorationLine: 'underline',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'black',
  },
  showPasswordButton: {
    padding: 10,
    borderRadius: 25,
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
  recoverPass:{
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    padding: 5,
  }
});

export default Inicio;
