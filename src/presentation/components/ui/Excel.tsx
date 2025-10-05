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
    Alert,
    PermissionsAndroid,
    Platform
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { HOST_URL } from '../../../../utils/envconfig';
import Share from "react-native-share";
import stylesAdmin from './styles/stylesAdmin';

interface User {
    _id: string;
    name: string;
    email: string;
    plan: string;
    planDuration: number;
    phonenumber: string;
    role: string;
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
        return <Text style={stylesAdmin.errorText}>No tienes permiso para acceder a esta pantalla</Text>;
    }

    if (loading) {
        return (
            <View style={stylesAdmin.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    const handleExportAllUsers = async () => {
    try {
        const formattedData = users.map(user => ({
        Nombre: user.name,
        Teléfono: user.phonenumber,
        Correo: user.email,
        Plan: user.plan,
        'Duración del plan': user.planDuration,
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

        const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

        // Guardar dentro del sandbox de la app (no en Descargas directo)
        const filePath = `${RNFS.CachesDirectoryPath}/Usuarios.xlsx`;
        await RNFS.writeFile(filePath, wbout, 'base64');

        // Compartir el archivo con Share
        await Share.open({
        url: `file://${filePath}`,
        type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        failOnCancel: false,
        showAppsToView: true, // muestra apps para abrir o guardar
        });
    } catch (error) {
        console.error("Error al exportar a Excel:", error);
        Alert.alert("Error", "No se pudo exportar a Excel.");
    }
    };


    return (
        <View style={stylesAdmin.container}>
            <TextInput
                style={stylesAdmin.searchInput}
                placeholder="Buscar usuarios..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={stylesAdmin.exportButton} onPress={handleExportAllUsers}>
                <Text style={stylesAdmin.exportButtonText}>Descargar Todos los Usuarios</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredUsers}
                keyExtractor={user => user._id}
                renderItem={({ item }) => (
                    <View style={stylesAdmin.userContainer}>
                        <Text style={stylesAdmin.userText}>Nombre: {item.name}</Text>
                        <Text style={stylesAdmin.userText}>Correo: {item.email}</Text>
                        <Text style={stylesAdmin.userText}>Plan: {item.plan}</Text>
                        <Text style={stylesAdmin.userText}>Duración del Plan: {item.planDuration} días</Text>
                    </View>
                )}
            />
        </View>
    );
};


export default Excel;
