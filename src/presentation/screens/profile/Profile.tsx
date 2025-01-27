import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Calendario, Setting, List } from "../../icons/Icons";
import { globalStyles } from "../../../config/theme/Theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = () => {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUserDetails();
    const interval = setInterval(() => {
      getUserDetails();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get('http://10.0.2.2:3001/api/users/me', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const userData = response.data;
      setUserName(userData.name);
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token REMOVE')
      navigation.navigate('SignUp');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SafeAreaView style={style.maincontainer}>

      <View style={globalStyles.globalMargin}>
        <View style={globalStyles.SetProfileImageContainer}>
          <Text style={globalStyles.setText}>{userName}</Text>
        </View>
        <View style={globalStyles.setContienerMid}>
          <TouchableOpacity style={globalStyles.SetButtons} onPress={() => navigation.navigate('Calendar')}>
            <View style={globalStyles.SetcontainerIcon}>
              <Calendario />
            </View>
            <Text style={globalStyles.SetTextPlan}>Calendario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.SetButtons} onPress={() => navigation.navigate('Sub')}>
            <View style={globalStyles.SetcontainerIcon}>
              <Setting />
            </View>
            <Text style={globalStyles.SetTextPlan}>Configuración subscripción</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.SetButtons} onPress={() => Alert.alert('Proximamente')}>
            <View style={globalStyles.SetcontainerIcon}>
              <List />
            </View>
            <Text style={globalStyles.SetTextPlan}>Próximos eventos</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.button} onPress={handleLogout}>
          <Text style={style.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
    height: 'auto',
  },
  button: {
    backgroundColor: '#5A215E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
