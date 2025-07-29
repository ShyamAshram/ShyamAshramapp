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
import { Set as Seti } from '../../icons/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingActionButton from '../../components/ui/FloatingButton';
import StudentRegistrationModal from '../../components/ui/AddU';
import { globalStyles } from '../../../config/theme/Theme';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { HOST_URL } from '../../../../utils/envconfig';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Student {
  _id: any;
  userName: string;
  userId:any;
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
  const navigation = useNavigation<any>()
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [savedDays, setSavedDays] = useState<Set<string>>(new Set());



  useEffect(() => {
    fetchStudents();
  }, [selectedDay]);

  const fetchStudents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${HOST_URL}/api/teach/all-registrations`, {
        headers: { Authorization: 'Bearer ' + token },
      });

      setStudents(response.data); // Ya viene filtrado desde el backend
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
        `${HOST_URL}/api/teach/update-attendance/${studentId}`,
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

      const response = await axios.get(`${HOST_URL}/api/users/me`, {
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
      await axios.delete(`${HOST_URL}/api/teach/clear-registrations`, {
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
  console.log('students', JSON.stringify(students, null, 2))
  const attendedStudents = students
    .filter(student => student.attended && student.dayOfWeek === selectedDay)
    .map(student => ({
      _id: student?.userId?._id,
      userName: student.userName,
      userEmail: student.userEmail
    }));
    console.log('lista', JSON.stringify(attendedStudents, null, 2))
  if (attendedStudents.length === 0) {
    Alert.alert('Aviso', 'No hay estudiantes con asistencia marcada.');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
      `${HOST_URL}/api/list/save-attendance`,
      { attendedStudents, instructorId: 2  },
      { headers: { Authorization: 'Bearer ' + token } }
    );
    console.log(response)
    Alert.alert('Lista guardada', 'La lista de estudiantes que asistieron fue guardada con éxito.');
    setSavedDays(prevSavedDays => new Set([...prevSavedDays, selectedDay]));

    setStudents(prevStudents =>
      prevStudents.filter(student => student.dayOfWeek !== selectedDay)
    );
  } catch (error: any) {
  console.error('Error al guardar asistencia:', error.response?.data || error.message);
  Alert.alert('Error', error.response?.data?.message || 'No se pudo guardar la lista.');
}

};

  useEffect(() => {
    const loadSavedDays = async () => {
      const saved = await AsyncStorage.getItem('savedDays');
      if (saved) {
        setSavedDays(new Set(JSON.parse(saved)));
      }
    };
    loadSavedDays();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('savedDays', JSON.stringify(Array.from(savedDays)));
  }, [savedDays]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const studentsByDay = students.filter((student) => student.dayOfWeek === selectedDay)
    .filter((student) => {
      const studentDate = new Date(student.date);
      const today = new Date();
      const lastSaturday = new Date(today);
      lastSaturday.setDate(today.getDate() - today.getDay() - 1);

      return studentDate >= lastSaturday;;
    });
  const filteredStudents = studentsByDay.filter((student) =>
    student.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Text style={{ color: '#5a215e' }}>Cargando inscripciones..</Text>;
  }
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      // console.log('Token REMOVE')
      navigation.navigate('Landing');
    } catch (error) {
      // console.error('Error al cerrar sesión:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={{ flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{ height:'100%', justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.header}>Hola, {userName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={globalStyles.profileImage}>
          <Seti color={'#1C495E'}/>
        </TouchableOpacity> 
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar estudiante por nombre..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={{height:50, width:'100%'}}>
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
      </View>
      {filteredStudents.length === 0 ? (
        <View style={{ height: 500 }}>
          <Text style={styles.noStudentsText}>No hay estudiantes inscritos para {selectedDay}</Text>
        </View>

      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 10 }}
          style={{  height: 500}}
          renderItem={({ item }) => (
            console.log('item desde profe', item),
            <View style={styles.card}>
              <Text style={styles.studentName}>{item.userName}</Text>
              <Text style={styles.studentEmail}>{item.userEmail}</Text>
              <Text style={styles.studentEmail}>{item.dayOfWeek}</Text>
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
      <FloatingActionButton onPress={() => setModalVisible(true)} />

      <StudentRegistrationModal
        visible={modalVisible}
        data={filteredStudents}
        onClose={() => setModalVisible(false)}
      />
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



export default Profe;
