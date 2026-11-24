
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { HOST_URL } from '../../../../web/env.web';
import LogoUrl from '../../assets/logo.svg?url';


export const Inicio = () => {

  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = async () => {
    setError('');

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    if (!validateEmail(normalizedEmail)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${HOST_URL}/api/users/login`,
        {
          email: normalizedEmail,
          password,
        },
      );

      const user = response.data?.user;
      const token = response.data?.token;

      if (!token || !user) {
        throw new Error('La respuesta del servidor no contiene los datos de acceso.');
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', user.role ?? '');

      switch (user.role) {
        case 'admin':
          navigation.reset({
            index: 0,
            routes: [{ name: 'Admin' }],
          });
          break;

        case 'profe':
          navigation.reset({
            index: 0,
            routes: [{ name: 'Prof' }],
          });
          break;

        default:
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
          break;
      }
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'No fue posible iniciar sesión. Inténtalo nuevamente.';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor:'white', justifyContent: 'center', alignItems: 'center' }]}>
      <View style={[styles.logoContainer, { width: Math.min(width * 0.9, 420) }]}>
        <Image
          source={{ uri: LogoUrl }}
          resizeMode="cover"
          style={styles.logo}
        />
      </View>

      <View style={styles.form}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#5A215E"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          editable={!loading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            placeholder="Contraseña"
            placeholderTextColor="#5A215E"
            secureTextEntry={!showPassword}
            autoComplete="current-password"
            editable={!loading}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(previous => !previous)}
            disabled={loading}
            style={styles.showPassword}
          >
            <Text style={styles.showPasswordText}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate('RecuperarContrasena')}
          disabled={loading}
          style={styles.forgotButton}
        >
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={loading}
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  logoContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
  },
  logo: {
    width:350,
    height: 160,
  },
  form: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 15,
  },
  input: {
    width: '100%',
    fontSize:25,
    fontFamily: 'Quicksand-Bold',
    minHeight: 68,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 15,
    color: '#000',
    backgroundColor: 'white',
    outlineStyle: 'none',
    
  } as any,
  passwordContainer: {
    width: '100%',
    minHeight: 48,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize:25,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    minHeight: 68,
    color: '#000',
    fontSize:25,
    fontFamily: 'Quicksand-Bold',
  } as any,
  showPassword: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  showPasswordText: {
    color: '#5A215E',
    fontWeight: '600',
  },
  error: {
    width: '100%',
    color: '#B00020',
    textAlign: 'center',
    fontSize: 13,
  },
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#5A215E',
    fontSize: 20,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#5A215E',
    width: '80%',
    minHeight: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Quicksand-Bold',
  },
});

export default Inicio;
