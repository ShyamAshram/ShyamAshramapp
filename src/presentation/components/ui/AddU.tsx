import React, { useState, useEffect, SetStateAction } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL } from '../../../../utils/envconfig';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    visible: boolean;
    data:any
    onClose: () => void;

}
interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
  role: string; 
}

const StudentRegistrationModal: React.FC<Props> = ({data,  visible, onClose }) => {
    console.log('data desde modal', data);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const [selectedPlan, setSelectedPlan] = useState<{ [key: string]: string }>({});
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
      
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaActual = diasSemana[hoy.getDay()];
    const [newStudent, setNewStudent]= useState<any>();
    const [newStudentId, setNewStudentId] = useState<string | null>(null);
    // console.log('Día actual:', diaActual);
    // console.log('id del nuevo estudiante:', newStudentId);

    type PlanNombre = 'Anualidad' |'6 meses'|'3 meses' | 'Ilimitado' | '4 clases' | '1 clase' | 'No tienes un plan';
    
    const planesConDuracion: Record<PlanNombre, number> = {
        'Anualidad': 365,
        '6 meses': 186,
        '3 meses':93,
        'Ilimitado': 30,
        '4 clases': 4,
        '1 clase': 1,
        'No tienes un plan': 0
    };
    const planes = [
        { label: 'Seleccionar plan...', value: '' },
        { label: 'Anualidad (365 días)', value: 'Anualidad' },
        { label: '6 meses', value:'6 meses'},
        { label: '3 meses', value:'3 meses'},
        { label: 'Ilimitado (30 días)', value: 'Ilimitado' },
        { label: '4 clases (4 días)', value: '4 clases' },
        { label: '1 clase (1 día)', value: '1 clase' },
        { label: 'No tienes un plan', value: 'No tienes un plan' },
        ];
    const uniquePlanes = Array.from(new Map(planes.map(p => [p.value, p])).values());


  const handleAddStudentToClass = async (classId: string) => {
  if (!newStudentId) {
    Alert.alert('Error', 'Debes registrar al estudiante primero');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.post(`${HOST_URL}/api/classes/registerClass`, {
      classId,
      dayOfWeek:diaActual,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    Alert.alert('Inscrito', `El estudiante fue inscrito a la clase del ${data.dayOfWeek}`);
    setNewStudentId(null);
    onClose();
  } catch (error) {
    console.error('Error al inscribir al estudiante:', error);
    Alert.alert('Error', 'No se pudo inscribir el estudiante a la clase');
  }
};


    const [role] = useState('');

    const handleRegister = async () => {
        const phoneNumberParsed = parsePhoneNumberFromString(phonenumber, 'CO');
        if (!phoneNumberParsed || !phoneNumberParsed.isValid()) {
            Alert.alert('Error', 'Número de teléfono no válido');
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

            const studentId = response.data._id;
            const student = response.data;
            setNewStudent(student);
            setNewStudentId(studentId);
            console.log('Usuario registrado:', response.data);
            Alert.alert('Éxito', 'Usuario registrado correctamente');
            setName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setBirthDate(null);

            onClose();

        } catch (error: any) {
            if (error.response) {

                console.error('Error en la respuesta del servidor:', error.response.data);
                Alert.alert('Error', `Error del servidor: ${error.response.data.message || 'Ocurrió un problema'}`);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                Alert.alert('Error', 'No se pudo conectar con el servidor');
            } else {
                console.error('Error desconocido:', error.message);
                Alert.alert('Error', 'Ocurrió un problema inesperado');
            }
        }
    };
    const getOpenSetter = (userId: string) => (callback: SetStateAction<boolean>) => {
      setOpenDropdowns(prev => ({
        ...prev,
        [userId]: typeof callback === 'function' ? callback(prev[userId] || false) : callback,
      }));
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };
      const updateUserPlan = async (userId: string, newPlan: string, newDuration: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`${HOST_URL}/api/users/${userId}`, {
        plan: newPlan,
        planDuration: newDuration
      }, {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user._id === userId) {
            return {
              ...user,
              plan: newPlan,
              planDuration: newDuration
            };
          }
          return user;
        });
      });
      console.log('Usuario actualizado:', response.data);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

useEffect(() => {
  if (newStudentId && visible) {
    setTimeout(() => {
      Alert.alert(
        "Atención",
        "Debe asignar un plan al estudiante primero antes de añadirlo a la clase"
      );
    }, 300);
  }
}, [newStudentId, visible]);


    return (
        <Modal transparent visible={visible} animationType="slide" presentationStyle='overFullScreen'>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {!newStudentId ? (
                    <> 
                    <Text style={styles.title}>Inscribir Estudiante</Text>
                    <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nombre completo" placeholderTextColor={'#5A215E'} />
                    <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Correo Electrónico" placeholderTextColor={'#5A215E'} />
                    <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholder="Contraseña" placeholderTextColor={'#5A215E'} />

                    <TextInput
                        value={phonenumber}
                        onChangeText={setPhoneNumber}
                        style={styles.input}
                        placeholder="Número de Teléfono"
                        keyboardType="phone-pad"
                        placeholderTextColor={'#5A215E'}
                    />


                    <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Inscribir</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                    ):(
                    
                        <>
                    <Text style={styles.title}>Asignar Plan al Estudiante</Text>
                    <DropDownPicker
                        zIndex={1000}
                        zIndexInverse={3000}
                        listMode='SCROLLVIEW'
                        dropDownDirection='AUTO'
                        open={openDropdowns[newStudentId ?? '']}
                        setOpen={getOpenSetter(newStudentId ?? '')} 
                        value={selectedPlan[newStudentId ?? ''] || null}
                        setValue={(callback) => {
                            const value = typeof callback === 'function' ? callback(selectedPlan[newStudentId ?? '']) : callback;
                            const duration = planesConDuracion[value as PlanNombre];
                            if (typeof duration === 'number') {
                            updateUserPlan(newStudentId ?? '', value, duration);
                            setSelectedPlan(prev => ({ ...prev, [newStudent._id]: value }));
                            }
                        

                        }}
                        items={uniquePlanes}
                        placeholder="Selecciona un plan"
                        style={{ borderColor: '#5a215e',backgroundColor: '#FFF', borderWidth:3}}
                        dropDownContainerStyle={{  backgroundColor: '#fff',  position: 'absolute', zIndex: 2000, maxHeight:600, }}
                        containerStyle={{ marginBottom: openDropdowns[newStudentId ?? ''] ? 320 : 20, position: 'relative', zIndex: 3000,}}
                    />
                    
                    
                    <View style={styles.buttonContainer2}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                        <TouchableOpacity style={[styles.registerButton, { opacity: newStudentId ? 1 : 0.5 }]} onPress={() => handleAddStudentToClass(data.classId)} disabled={!selectedPlan}>
                            <Text style={styles.buttonText}>Añadir a la clase</Text>
                        </TouchableOpacity>
                    </View>
                    </>

                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#5A215E',
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
     buttonContainer2: {
        flexDirection: 'row',
        marginTop:2,
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#888',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: '#5A215E',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default StudentRegistrationModal;
