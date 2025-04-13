import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const RecuperarContrasena = ({ navigation }: any) => {
    const [email, setEmail] = useState('');

    const handleRecuperar = async () => {
        if (!email) {
            Alert.alert('Error', 'Por favor, ingresa tu correo electrónico');
            return;
        }

        try {
            // Enviar solicitud al servidor para recuperar la contraseña
            const response = await axios.post('https://yapp-production.up.railway.app/api/users/recover-password', { email });

            Alert.alert('Éxito', 'Se ha enviado un enlace de recuperación a tu correo.');
            navigation.goBack();
        } catch (error: any) {
            console.error('Error al recuperar contraseña:', error);
            Alert.alert('Error', error.response?.data?.error || 'Hubo un problema, intenta nuevamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder='Correo Electrónico'
                keyboardType='email-address'
                autoCapitalize='none'
                placeholderTextColor={'#5A215E'}
            />
            <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5A215E',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        color: 'black',
    },
    button: {
        backgroundColor: '#5A215E',
        width: '70%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RecuperarContrasena;