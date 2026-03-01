import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { HOST_URL } from '../../../../utils/envconfig';
const{width, height} = Dimensions.get('window');
import Logo from '../../assets/logo.svg';


export const Registro = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role] = useState('');

  const handleRegister = async () => {
    const phoneNumberParsed = parsePhoneNumberFromString(phonenumber, 'CO');
    if (!phoneNumberParsed || !phoneNumberParsed.isValid()) {
      Alert.alert('Número de teléfono no válido');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${HOST_URL}/api/users/register`, {
        name,
        email: email.trim().toLowerCase(),
        password,
        phonenumber: phoneNumberParsed.formatInternational(),
        birthDate,
        role
      });

      if(response.status === 201) {
        Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada correctamente');
        setTimeout(() => {
          navigation.navigate('Landing');
        }, 1000);
      } else {
        Alert.alert('Error', 'Ocurrió un error al registrar tu cuenta');
      }
    }catch (error: any) {
      const message =
        error.response?.data?.error ||
        "Ocurrió un error al registrar";

      Alert.alert("Ups", message);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{borderWidth:0, height: height * 0.25, width: width, justifyContent: 'center', alignItems: 'center', marginTop: 80}}>
        <Logo width={300} height={200}/>
      </View>
      <View style={{borderWidth:0, gap:10,    width: width, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput maxFontSizeMultiplier={1} value={name} onChangeText={setName} style={style.input} placeholder="Nombre completo" placeholderTextColor={'#5A215E'} />
      <TextInput maxFontSizeMultiplier={1} value={email} onChangeText={setEmail} style={style.input} placeholder="Correo Electrónico" placeholderTextColor={'#5A215E'} />
      <TextInput maxFontSizeMultiplier={1} value={password} onChangeText={setPassword} secureTextEntry style={style.input} placeholder="Contraseña" placeholderTextColor={'#5A215E'} />

      <TextInput
        maxFontSizeMultiplier={1}
        value={phonenumber}
        onChangeText={setPhoneNumber}
        maxLength={10}
        style={style.input}
        placeholder="Número de Teléfono"
        keyboardType="phone-pad"
        placeholderTextColor={'#5A215E'}
      />


      <TouchableOpacity style={style.input} onPress={() => setShowDatePicker(true)}>
        <Text maxFontSizeMultiplier={1} style={{ color: '#5A215E' }}>{birthDate ? birthDate.toDateString() : 'Fecha de Nacimiento'} </Text>
      </TouchableOpacity>


      {showDatePicker && (
        <DateTimePicker
          
          value={birthDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          style={{ backgroundColor: '#5A215E', }}
          
        />
      )}
      </View>
      <TouchableOpacity  disabled={loading} style={style.button2} onPress={handleRegister}>
        <Text maxFontSizeMultiplier={1} style={style.buttonText}>Registrar</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#5A215E" />}
    </View>
  );
};

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    borderWidth: 1,
    width: width,
    height: height,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: width,
    height: height * 0.3,
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: 80,
  },
  input: {
    position: 'relative',
    width: width * 0.9,
    height: height * 0.05,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
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
    width: width * 0.7,
    height: height * 0.04,
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
