import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, TextInput, Text, StyleSheet, KeyboardAvoidingView, Platform, View, ActivityIndicator, PermissionsAndroid, Dimensions} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { HOST_URL } from '../../../../utils/envconfig';
import { getMessaging } from '@react-native-firebase/messaging';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.svg';

const{width, height} = Dimensions.get('window');

export const Inicio = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading]= useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();

async function subscribeUserTopics() {
  try {
    await getMessaging().subscribeToTopic('general');
  } catch (error) {
    console.error("Error subscribing to topic", error);
  }
}
const requestFilePermission = async () => {
  try {
    console.log("Requesting file permissions...");
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // Android 13+: permisos separados
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ]);

        return (
          granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.READ_MEDIA_VIDEO'] === PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.READ_MEDIA_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        // Android < 13
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permiso de almacenamiento',
            message: 'Necesitamos acceder a tus archivos para continuar',
            buttonNeutral: 'Preguntar después',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true; // iOS no requiere
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestUserPermission = async () => {
  try {

      if (Number(Platform.Version) >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    
  } catch (error) {
    console.error("Error solicitando permisos de notificación:", error);
    return false;
  }
};

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
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role);
      if (role === "user") {
      try {
        const fcmToken = await getMessaging().getToken();
        const response =await axios.post(`${HOST_URL}/api/users/save-fcm-token`, {
          userId: user._id,
          fcmToken,
        });
        console.log("FCM token enviado al backend:", fcmToken);
        console.log("Respuesta del backend:", response.data);
        await subscribeUserTopics()
      } catch (err) {
        console.error("Error guardando FCM token:", err);
      }
    }

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
      await requestUserPermission();
      await requestFilePermission();
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
  

  return (
    <View style={style.containerMain}>
      <Logo width={300} height={200}/>

      <View style={{width:'100%', justifyContent:'flex-start',alignItems:'center', borderWidth: 0, padding:10}}>  
      <TextInput
        maxFontSizeMultiplier={1}
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
          maxFontSizeMultiplier={1}

          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={style.inputPassword}
          placeholder='Contraseña'
          placeholderTextColor={'#5A215E'}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={style.showPasswordButton}>
          <Text maxFontSizeMultiplier={1} style={{ color: '#5A215E', fontWeight: 'bold' }}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={style.recoverPass}>
        <TouchableOpacity onPress={() => navigation.navigate('RecuperarContrasena')}>
          <Text maxFontSizeMultiplier={1} style={style.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

    <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={style.button2} onPress={handleLogin}>
        <Text maxFontSizeMultiplier={1} style={style.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
    {isLoading && <ActivityIndicator size="large" color="#5A215E" style={{ flex:1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
    </View>

  );
};

const style = StyleSheet.create({
  containerMain: {
    borderWidth: 0,
    flex: 1,
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
    borderWidth:0,
    width: width,
    height: height * 0.3,
    marginBottom: 20,
  },
  input: {
    width: width * 0.9,
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
    width: width * 0.9,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: 'white',
    marginBottom: 5,
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
    width: width * 0.7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
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
