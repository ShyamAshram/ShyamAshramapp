
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card } from 'react-native-paper';

import styles from './styles';
import { useClassSchedules } from './hook/useClassSchedules';
import BackButton from '../../components/ui/BackButton.web';

const Lunes1 = () => {
  const dayOfWeek = 'Lunes';

  const {
    classSchedules,
    loading,
    handleClassRegistration,
    userRegistrations,
  } = useClassSchedules(dayOfWeek);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<
    'success' | 'error' | 'info'
  >('info');

  const onRegisterPress = async (classId: string) => {
    setMessage('');

    const result = await handleClassRegistration(classId);

    if (result.alreadyRegistered) {
      setMessage('Ya estás inscrito en esta clase.');
      setMessageType('info');
    } else if (result.success) {
      setMessage(`Inscripción exitosa. Fecha: ${result.date}`);
      setMessageType('success');
    } else {
      setMessage('Necesitas un plan activo para inscribirte.');
      setMessageType('error');
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
    <BackButton fallback="Class" />
      {message !== '' && (
        <View
          style={{
            margin: 15,
            padding: 15,
            borderRadius: 10,
            backgroundColor:
              messageType === 'success'
                ? '#e6f5e9'
                : messageType === 'error'
                ? '#ffebee'
                : '#e8f0fe',
          }}
        >
          <Text
            style={{
              color:
                messageType === 'success'
                  ? '#216e39'
                  : messageType === 'error'
                  ? '#b42318'
                  : '#2456a6',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        </View>
      )}

      {loading ? (
        <View style={{ padding: 30, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5a215e" />
          <Text style={{ marginTop: 10 }}>Cargando horarios...</Text>
        </View>
      ) : classSchedules.length > 0 ? (
        classSchedules.map((classInfo) => (
          <View style={styles.container} key={classInfo._id}>
            <Text style={styles.header}>{classInfo.name}</Text>

            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.label}>
                  FECHA:{' '}
                  <Text style={styles.info}>{classInfo.dayOfWeek}</Text>
                </Text>

                <Text style={styles.label}>
                  HORA:{' '}
                  <Text style={styles.info}>{classInfo.time}</Text>
                </Text>

                <Text style={styles.label}>
                  INSTRUCTOR:{' '}
                  <Text style={styles.info}>
                    {(classInfo.instructorId as any)?.name ?? 'No disponible'}
                  </Text>
                </Text>
              </Card.Content>
            </Card>

            {classInfo.instructorId && (
              <TouchableOpacity
                style={[
                  styles.buttonday,
                  userRegistrations.includes(classInfo._id) && {
                    backgroundColor: '#ccc',
                  },
                ]}
                onPress={() => onRegisterPress(classInfo._id)}
                disabled={userRegistrations.includes(classInfo._id)}
              >
                <Text style={styles.day}>
                  {userRegistrations.includes(classInfo._id)
                    ? 'INSCRITO'
                    : 'INSCRIBIRSE'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <View style={styles.noClassesContainer}>
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontFamily: 'Quicksand-Bold',
              textAlign: 'center',
            }}
          >
            No hay horarios disponibles para {dayOfWeek}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Lunes1;
