import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL } from '../../../../utils/envconfig';
import styles from './styles';
import { getNextDateForDay } from './service';
import { useClassSchedules } from './hook/useClassSchedules';

// Define la interfaz para el horario de clases
interface ClassSchedule {
  _id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  time: string;
  instructorId: Object;
  instructor: string;
}

const Lunes1 = () => {
  const dayOfWeek = 'Lunes';
    const { classSchedules, loading, handleClassRegistration, userRegistrations } =
    useClassSchedules(dayOfWeek);

 const onRegisterPress = async (classId: string) => {
    const result = await handleClassRegistration(classId);

    if (result.alreadyRegistered) {
      Alert.alert('Ya inscrito', 'Ya estás inscrito en esta clase.');
    } else if (result.success) {
      Alert.alert(
        'Inscripción exitosa',
        `Te has inscrito para ${result.date}`
      );
    } else {
      Alert.alert(
        'Suscripción requerida',
        'Necesitas un plan activo.'
      );
    }
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      {classSchedules.length > 0 ? (
        classSchedules.map((classInfo, index) => (
          <View style={styles.container} key={classInfo._id}>
            <Text maxFontSizeMultiplier={1} style={styles.header}>{classInfo.name}</Text>
            <Card style={styles.card}>
              <Card.Content>
                <Text maxFontSizeMultiplier={1} style={styles.label}>FECHA: <Text maxFontSizeMultiplier={1} style={styles.info}>{classInfo.dayOfWeek}</Text></Text>
                <Text maxFontSizeMultiplier={1} style={styles.label}>HORA: <Text maxFontSizeMultiplier={1} style={styles.info}>{classInfo.time}</Text></Text>
                <Text maxFontSizeMultiplier={1} style={styles.label}>INSTRUCTOR: <Text maxFontSizeMultiplier={1} style={styles.info}>{(classInfo.instructorId as any)?.name}</Text></Text>
              </Card.Content>
            </Card>
            {classInfo.instructorId && ( 

            <TouchableOpacity
              style={[styles.buttonday, userRegistrations.includes(classInfo._id) && { backgroundColor: '#ccc' }]}
              onPress={() => onRegisterPress(classInfo._id)}
              disabled={userRegistrations.includes(classInfo._id)}
            >
              <Text maxFontSizeMultiplier={1} style={styles.day}>
                {userRegistrations.includes(classInfo._id) ? 'INSCRITO' : 'INSCRIBIRSE'}
              </Text>
            </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <View style={styles.noClassesContainer} >
          <Text maxFontSizeMultiplier={1} style={{fontSize: 14, color: '#000', fontFamily:'Quicksand-Bold', textAlign:'center'}}>No hay horarios disponibles para {dayOfWeek}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Lunes1;
