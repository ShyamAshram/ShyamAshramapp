import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    visible: boolean;
    onClose: () => void;

}

const StudentRegistrationModal: React.FC<Props> = ({ visible, onClose }) => {
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
            Alert.alert('Error', 'Número de teléfono no válido');
            return;
        }

        try {
            const response = await axios.post('https://yapp-production.up.railway.app/api/users/register', {
                name,
                email,
                password,
                phonenumber: phoneNumberParsed.formatInternational(),
                birthDate,
                role
            });

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


    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
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
                    <View style={styles.buttonContainer2}>
                        <TouchableOpacity style={styles.registerButton}>
                            <Text style={styles.buttonText}>Añadir a la clase</Text>
                        </TouchableOpacity>
                    </View>
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
