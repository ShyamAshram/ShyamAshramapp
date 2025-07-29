import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../config/theme/Theme';
import { HOST_URL } from '../../../../utils/envconfig';

interface AttendanceGroup {
    title: string;
    data: any[];
}

const AttendanceListScreen = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [attendanceLists, setAttendanceLists] = useState<AttendanceGroup[]>([]);

    useEffect(() => {
        const fetchAttendanceLists = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(
                    `${HOST_URL}/api/list/attendance-lists`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // Muestra en consola la respuesta para depurar la estructura de los datos
                console.log('Respuesta de asistencia:', response.data);

                let groupedData: AttendanceGroup[] = [];
                // Si el backend ya agrupa los datos, esperamos que cada objeto tenga _id y la propiedad "lists"
                if (
                    Array.isArray(response.data) &&
                    response.data.length > 0 &&
                    response.data[0]._id !== undefined &&
                    response.data[0].lists !== undefined
                ) {
                    groupedData = response.data.map((group: any) => ({
                        title: group._id ? group._id : 'Sin fecha',
                        data: group.lists,
                    }));
                } else if (Array.isArray(response.data)) {
                    // Si la respuesta es una lista simple, la agrupamos por fecha usando el campo "createdAt" o "date"
                    groupedData = groupByDate(response.data);
                }
                setAttendanceLists(groupedData);
            } catch (error) {
                console.error('Error al obtener las listas de asistencia:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceLists();
    }, []);

    // Función para agrupar datos por fecha
    const groupByDate = (data: any[]): AttendanceGroup[] => {
        const grouped = data.reduce((acc: { [key: string]: any[] }, list: any) => {
            // Se asume que el documento tiene "createdAt" (por usar timestamps) o "date"
            const dateField = list.createdAt || list.date;
            const date = dateField ? new Date(dateField).toLocaleDateString() : 'Sin fecha';
            if (!acc[date]) acc[date] = [];
            acc[date].push(list);
            return acc;
        }, {});

        return Object.keys(grouped).map((date) => ({
            title: date,
            data: grouped[date],
        }));
    };

    return (
        <SafeAreaView style={globalStyles.mainContainer2}>
            <View style={globalStyles.header2}>
                <Text style={styles.title}>Listas de Asistencia</Text>
            </View>
            {loading ? (
                <Text style={styles.loadingText}>Cargando...</Text>
            ) : (
                <SectionList
                    sections={attendanceLists}
                    keyExtractor={(item) => item._id || Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listText}>
                                {item.students && Array.isArray(item.students)
                                    ? item.students.map((s: any) => s.userName).join(', ')
                                    : 'Sin estudiantes'}
                            </Text>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.loadingText}>No hay listas de asistencia</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ddd',
        padding: 10,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listText: {
        fontSize: 16,
        color: '#333'
    },
});

export default AttendanceListScreen;
