import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { HOST_URL } from '../../../../utils/envconfig';

export const Registro = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [role] = useState('');

  const handleRegister = async () => {
    const phoneNumberParsed = parsePhoneNumberFromString(phonenumber, 'CO');
    if (!phoneNumberParsed || !phoneNumberParsed.isValid()) {
      console.error('Número de teléfono no válido');
      return;
    }

    try {
      const response = await axios.post(`${HOST_URL}/api/users/register`, {
        name,
        email,
        password,
        phonenumber: phoneNumberParsed.formatInternational(),
        birthDate,
        role
      });
      console.log('User registered:', response.data);
      navigation.navigate('Landing');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image style={style.logo} source={require('../../assets/Logo1.png')} />

      <TextInput value={name} onChangeText={setName} style={style.input} placeholder="Nombre completo" placeholderTextColor={'#5A215E'} />
      <TextInput value={email} onChangeText={setEmail} style={style.input} placeholder="Correo Electrónico" placeholderTextColor={'#5A215E'} />
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={style.input} placeholder="Contraseña" placeholderTextColor={'#5A215E'} />

      <TextInput
        value={phonenumber}
        onChangeText={setPhoneNumber}
        style={style.input}
        placeholder="Número de Teléfono"
        keyboardType="phone-pad"
        placeholderTextColor={'#5A215E'}
      />


      <TouchableOpacity style={style.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: '#5A215E' }}>{birthDate ? birthDate.toDateString() : 'Fecha de Nacimiento'} </Text>
      </TouchableOpacity>


      {showDatePicker && (
        <DateTimePicker
          value={birthDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={{ backgroundColor: '#5A215E' }}
        />
      )}

      <TouchableOpacity style={style.button2} onPress={handleRegister}>
        <Text style={style.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 250,
    height: 250,
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: 80,
  },
  input: {
    position: 'relative',
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  button2: {
    marginTop: 20,
    backgroundColor: '#5A215E',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#5A215E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
