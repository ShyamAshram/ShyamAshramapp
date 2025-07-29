import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Linking,
    Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { HOST_URL } from '../../../../utils/envconfig';

interface User {
    _id: string;
    name: string;
    email: string;
    plan: string;
    planDuration: number;
    phonenumber: string;
    role: string;
    // Agrega otros campos que necesites, por ejemplo, fecha de nacimiento, etc.
}

const Excel = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${HOST_URL}/api/users/users`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                // Filtrar usuarios con rol 'user'
                const usersWithRoleUser = response.data.filter((user: User) => user.role === 'user');

                setUsers(usersWithRoleUser);
                setFilteredUsers(usersWithRoleUser);
                setLoading(false);

                const userRole = await AsyncStorage.getItem('role');
                if (userRole === 'admin') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    if (!isAdmin) {
        return <Text style={styles.errorText}>No tienes permiso para acceder a esta pantalla</Text>;
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    // Función para exportar todos los usuarios a Excel
    const handleExportAllUsers = async () => {
        try {
            // Mapea todos los usuarios a un objeto con las columnas que deseas
            const formattedData = users.map(user => ({
                Nombre: user.name,
                Teléfono: user.phonenumber,
                Correo: user.email,
                Plan: user.plan,
                'Duración del plan': user.planDuration,
                // Agrega otros campos que necesites, por ejemplo: FechaNacimiento: user.birthDate,
            }));

            // Crea la hoja de cálculo a partir de la data
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

            // Genera el archivo Excel en formato base64
            const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

            // Define la ruta donde se guardará el archivo
            const fileUri = RNFS.DocumentDirectoryPath + '/Usuarios.xlsx';

            // Escribe el archivo en el sistema de archivos en formato base64
            await RNFS.writeFile(fileUri, wbout, 'base64');
            Alert.alert("Éxito", "El archivo Excel se ha creado en: " + fileUri);
            // Opcional: Puedes abrir el archivo o compartirlo usando otras librerías
        } catch (error) {
            console.error("Error al exportar a Excel:", error);
            Alert.alert("Error", "No se pudo exportar a Excel.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar usuarios..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {/* Botón para exportar TODOS los usuarios */}
            <TouchableOpacity style={styles.exportButton} onPress={handleExportAllUsers}>
                <Text style={styles.exportButtonText}>Descargar Todos los Usuarios</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredUsers}
                keyExtractor={user => user._id}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <Text style={styles.userText}>Nombre: {item.name}</Text>
                        <Text style={styles.userText}>Correo: {item.email}</Text>
                        <Text style={styles.userText}>Plan: {item.plan}</Text>
                        <Text style={styles.userText}>Duración del Plan: {item.planDuration} días</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        color: '#5a215e'
    },
    exportButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 15,
    },
    exportButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userContainer: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    userText: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
    },
    whatsappButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25D366',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginRight: 10,
    },
    whatsappButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#D44638',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginRight: 10,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Excel;
