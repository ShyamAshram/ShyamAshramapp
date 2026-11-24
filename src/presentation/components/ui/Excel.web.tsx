
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as XLSX from 'xlsx';
import { HOST_URL } from '../../../../utils/envconfig';
import stylesAdmin from './styles/stylesAdmin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const userRole = await AsyncStorage.getItem('role');

                if (userRole === 'admin') {
                    setIsAdmin(true);
                }

                const response = await axios.get(`${HOST_URL}/api/users/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const usersWithRoleUser = response.data.filter(
                    (user: User) => user.role === 'user'
                );

                setUsers(usersWithRoleUser);
                setFilteredUsers(usersWithRoleUser);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const query = searchQuery.toLowerCase();

        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );

        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleExportAllUsers = () => {
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

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

            // Generar el archivo XLSX como datos binarios.
            const excelData = XLSX.write(workbook, {
                type: 'array',
                bookType: 'xlsx',
            });

            const blob = new Blob([excelData], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            // Descargar directamente desde el navegador.
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = 'Usuarios.xlsx';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
            window.alert('No se pudo exportar a Excel.');
        }
    };

    if (loading) {
        return (
            <View style={stylesAdmin.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!isAdmin) {
        return (
            <Text style={stylesAdmin.errorText}>
                No tienes permiso para acceder a esta pantalla
            </Text>
        );
    }

    return (
        <View
            style={[
                stylesAdmin.containerExcel,
                { paddingTop: insets.top },
            ]}
        >
            <TextInput
                style={stylesAdmin.searchInput}
                placeholder="Buscar usuarios..."
                value={searchQuery}
                placeholderTextColor="#999"
                onChangeText={setSearchQuery}
            />

            <TouchableOpacity
                style={stylesAdmin.exportButton}
                onPress={handleExportAllUsers}
            >
                <Text style={stylesAdmin.exportButtonText}>
                    Descargar Todos los Usuarios
                </Text>
            </TouchableOpacity>

            <FlatList
                data={filteredUsers}
                keyExtractor={user => user._id}
                renderItem={({ item }) => (
                    <View style={stylesAdmin.userContainer}>
                        <Text style={stylesAdmin.userText}>
                            Nombre: {item.name}
                        </Text>
                        <Text style={stylesAdmin.userText}>
                            Correo: {item.email}
                        </Text>
                        <Text style={stylesAdmin.userText}>
                            Plan: {item.plan}
                        </Text>
                        <Text style={stylesAdmin.userText}>
                            Duración del Plan: {item.planDuration} días
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Excel;
