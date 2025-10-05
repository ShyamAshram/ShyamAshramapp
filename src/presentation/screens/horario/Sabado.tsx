import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL } from '../../../../utils/envconfig';
import styles from './styles';
interface ClassSchedule {
  _id: string;
  name: string;
  dayOfWeek: string;
  date: string;
  time: string;
  instructorId: Object;
  instructor: string;
}

const Sabado1 = () => {
  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const dayOfWeek = 'Sábado'; // Cambia esto según sea necesari
  useEffect(() => {
    fetchClassSchedules();
  }, []);

  const fetchClassSchedules = async () => {
    try {
      const response = await axios.get(`${HOST_URL}/api/classes/${dayOfWeek}`);
      console.log('Horarios:', response.data);
      setClassSchedules(response.data); // Almacena los horarios
    } catch (error) {
      console.error('Error fetching class schedules:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleClassRegistration = async (classId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${HOST_URL}/api/classes/registerClass`,
        { classId, dayOfWeek },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Inscripción exitosa', `Te has inscrito a la clase para el ${response.data.date}`);
    } catch (error) {
      {
        Alert.alert('Suscripción requerida', 'Necesitas tener un plan activo para inscribirte en esta clase.');
      }
    }
  };



  interface Instructor { name: string; [key: string]: any }

  // classSchedules.forEach((c) => {
  //   console.log('Instructor Name:', (c.instructorId as any).name);

  //   console.log(c.instructorId);
  // });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView>
      {classSchedules.length > 0 ? (
        classSchedules.map((classInfo, index) => (
          <View style={styles.container} key={classInfo._id}>
            <Text style={styles.header}>{classInfo.name}</Text>
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text style={styles.label}>FECHA: <Text style={styles.info}>{classInfo.dayOfWeek}</Text></Text>
                <Text style={styles.label}>HORA: <Text style={styles.info}>{classInfo.time}</Text></Text>
                <Text style={styles.label}>INSTRUCTOR: <Text style={styles.info}>{(classInfo.instructorId as any)?.name || 'No disponible'}</Text></Text>
              </Card.Content>
            </Card>

            <TouchableOpacity style={styles.buttonday} onPress={() => (handleClassRegistration(classInfo._id))} >
              <Text style={styles.day}>INCRIBIRSE</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>No hay horarios disponibles para {dayOfWeek}</Text>
      )}
    </ScrollView>
  );
};
export default Sabado1;
