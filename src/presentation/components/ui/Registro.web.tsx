
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { HOST_URL } from '../../../../web/env.web';
import LogoUrl from '../../assets/logo.svg?url';

export const Registro = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password || !phonenumber || !birthDate) {
      setError('Completa todos los campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    const phoneNumberParsed = parsePhoneNumberFromString(phonenumber, 'CO');

    if (!phoneNumberParsed || !phoneNumberParsed.isValid()) {
      setError('Número de teléfono no válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${HOST_URL}/api/users/register`, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phonenumber: phoneNumberParsed.formatInternational(),
        birthDate: new Date(`${birthDate}T12:00:00`),
        role: '',
      });

      if (response.status === 201) {
        setSuccess('Tu cuenta ha sido creada correctamente.');

        setTimeout(() => {
          navigation.navigate('Landing');
        }, 1200);
      } else {
        setError('Ocurrió un error al registrar tu cuenta.');
      }
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
        'Ocurrió un error al registrar tu cuenta.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: LogoUrl }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#5A215E"
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#5A215E"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#5A215E"
          secureTextEntry
        />

        <TextInput
          value={phonenumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          placeholder="Número de teléfono"
          placeholderTextColor="#5A215E"
          keyboardType="phone-pad"
          maxLength={10}
        />

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Fecha de nacimiento</Text>
          <input
            type="date"
            value={birthDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={(event) => setBirthDate(event.target.value)}
            style={{
              width: '100%',
              height: 42,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              color: '#5A215E',
              fontSize: 15,
            }}
          />
        </View>
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
      {!!success && <Text style={styles.success}>{success}</Text>}

      <TouchableOpacity
        disabled={loading}
        style={[styles.button, loading && styles.disabled]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Registrando...' : 'Registrar'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#5A215E" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  logoContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
  },
  logo: {
    width: 250,
    height: 160,
  },
  form: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: 'black',
    backgroundColor: 'white',
  },
  dateContainer: {
    width: '100%',
    minHeight: 55,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  dateLabel: {
    color: '#5A215E',
    fontSize: 11,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5A215E',
    width: '70%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    color: '#D32F2F',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
});

