import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendario } from '../../icons/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ClassSchedule = () => {
  const navigation = useNavigation<any>()
  const handlePress = () => {
    const websiteUrl = 'https://shyamashram.com/yoga/';
    Linking.openURL(websiteUrl);
  };


  return (
    <View style={styles.container}>


      <View style={styles.scheduleContainer}>
        <TouchableOpacity style={styles.buttonday} onPress={() => navigation.navigate('Lunes1')}>
          <Calendario />
          <Text style={styles.day}>LUNES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonday} onPress={() => navigation.navigate('Martes1')}>
          <Calendario />
          <Text style={styles.day}>MARTES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonday} onPress={() => navigation.navigate('Miercoles1')}>
          <Calendario />
          <Text style={styles.day}>MIÉRCOLES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonday} onPress={() => navigation.navigate('Jueves1')}>
          <Calendario />
          <Text style={styles.day}>JUEVES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonday} onPress={() => navigation.navigate('Viernes1')}>
          <Calendario />
          <Text style={styles.day}>VIERNES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonday} onPress={() => navigation.navigate('Sabado1')}>
          <Calendario />
          <Text style={styles.day}>SÁBADO</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,

  },
  scheduleContainer: {
    width: '100%',
    height: '90%',
    marginTop: 40,
    alignContent: 'center',
    justifyContent: 'center'
  },
  dayContainer: {
    marginBottom: 20,

  },
  day: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    color: '#FFFF'


  },
  classItem: {
    flexDirection: 'row',
    marginBottom: 6,
    justifyContent: 'space-between'
  },
  timeContainer: {
    width: 90,
    height: 16,

  },
  buttonday: {
    width: "100%",
    borderRadius: 20,
    height: 50,
    backgroundColor: '#D9A404',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  time: {
    textAlign: 'justify'
  },
  classNameContainer: {
    width: 200,
    height: 16,
  },
  className: {
    marginLeft: 50,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
});

export default ClassSchedule;
