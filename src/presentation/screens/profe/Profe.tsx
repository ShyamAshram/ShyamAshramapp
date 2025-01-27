import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Student {
  _id: string;
  userName: string;
  userEmail: string;
  instructorName: string;
  date: string;
  classId: string;
  dayOfWeek: string;
  attended: boolean;
}

const Profe = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [selectedDay]);

  const fetchStudents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://10.0.2.2:3001/api/teach/all-registrations', {
        headers: { Authorization: 'Bearer ' + token },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      Alert.alert('Error', 'No se pudieron cargar las inscripciones');
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (studentId: string, attended: boolean) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `http://10.0.2.2:3001/api/teach/update-attendance/${studentId}`,
        { attended },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId ? { ...student, attended } : student
        )
      );
    } catch (error) {
      console.error('Error updating attendance:', error);
      Alert.alert('Error', 'No se pudo actualizar la asistencia');
    }
  };

  const getUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get('http://10.0.2.2:3001/api/users/me', {
        headers: { Authorization: 'Bearer ' + token },
      });

      const userData = response.data;
      setUserName(userData.name);
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
    }
  };

  const clearStudentList = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete('http://10.0.2.2:3001/api/teach/clear-registrations', {
        headers: { Authorization: 'Bearer ' + token },
      });
      setStudents([]);
      Alert.alert('Lista limpiada', 'Se eliminaron todas las inscripciones.');
    } catch (error) {
      console.error('Error al limpiar la lista:', error);
      Alert.alert('Error', 'No se pudo limpiar la lista de inscripciones.');
    }
  };


  const saveAttendanceList = async () => {
    const attendedStudents = students.filter((student) => student.attended);
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://10.0.2.2:3001/api/list/save-attendance',
        { attendedStudents },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      Alert.alert('Lista guardada', 'La lista de estudiantes que asistieron fue guardada con éxito.');
      setStudents([]); // Limpia la lista local
    } catch (error) {
      console.error('Error saving attendance list:', error);
      Alert.alert('Error', 'No se pudo guardar la lista.');
    }
  };


  useEffect(() => {
    getUserDetails();
  }, []);

  const studentsByDay = students.filter((student) => student.dayOfWeek === selectedDay);
  const filteredStudents = studentsByDay.filter((student) =>
    student.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Text>Cargando inscripciones..</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.header}>Hola, {userName}</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar estudiante por nombre..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelector}>
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredStudents.length === 0 ? (
        <Text style={styles.noStudentsText}>No hay estudiantes inscritos para {selectedDay}</Text>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.studentName}>{item.userName}</Text>
              <Text style={styles.studentEmail}>{item.userEmail}</Text>
              <Text>{item.dayOfWeek}</Text>
              <View style={styles.attendanceContainer}>
                <Text style={styles.attendanceText}>Asistió:</Text>
                <Switch
                  value={item.attended}
                  onValueChange={(newValue) => updateAttendance(item._id, newValue)}
                />
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.ContainerBtnFoot}>
        <TouchableOpacity onPress={clearStudentList} style={styles.ButtonClear}>
          <Text style={styles.TxtBtn}>Limpiar Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveAttendanceList} style={styles.ButtonSave}>
          <Text style={styles.TxtBtn}>Guardar Asistencias</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TxtBtn: {
    color: 'white'
  },
  ButtonClear: {
    backgroundColor: '#ee4444',
    width: '50%',
    marginRight: 15,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  ButtonSave: {
    backgroundColor: '#31b673',
    width: '50%',
    marginRight: 15,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  ContainerBtnFoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  header: {

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C495E',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  dayButton: {
    height: 50,
    width: 90,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9A404',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: '#530460',
  },
  dayText: {
    color: '#FFF',
    fontSize: 15,
  },
  selectedDayText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  card: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentEmail: {
    fontSize: 14,
    color: 'gray',
  },
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  attendanceText: {
    fontSize: 16,
    marginRight: 10,
  },
  noStudentsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default Profe;
