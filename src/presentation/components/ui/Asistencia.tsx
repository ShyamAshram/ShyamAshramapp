import React, { useState, useEffect } from 'react';
import { View, Text, SectionList,} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../config/theme/Theme';
import { HOST_URL } from '../../../../utils/envconfig';
import stylesAdmin from './styles/stylesAdmin';

interface AttendanceGroup {
    title: string;
    data: any[];
}

const AttendanceListScreen = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [attendanceLists, setAttendanceLists] = useState<AttendanceGroup[]>([]);
    const insets = useSafeAreaInsets();

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

                let groupedData: AttendanceGroup[] = [];
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

    const groupByDate = (data: any[]): AttendanceGroup[] => {
        const grouped = data.reduce((acc: { [key: string]: any[] }, list: any) => {
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
        <View style={[globalStyles.mainContainer2]}>
            <View style={[globalStyles.header2,  {paddingTop:insets.top}]}>
                <Text maxFontSizeMultiplier={1} style={stylesAdmin.title}>Listas de Asistencia</Text>
            </View>
            {loading ? (
                <Text maxFontSizeMultiplier={1} style={stylesAdmin.loadingText}>Cargando...</Text>
            ) : (
                <SectionList
                    sections={attendanceLists}
                    keyExtractor={(item) => item._id || Math.random().toString()}
                    renderItem={({ item }) => (
                        console.log('Item de asistencia:', item),   
                    <View style={stylesAdmin.card}>
                        <Text maxFontSizeMultiplier={1} style={stylesAdmin.cardSubtitle}>
                        {item.students && Array.isArray(item.students)
                            ? item.students.map((s: any) => `• ${s.userName}, correo: ${s.userEmail}`).join('\n')  
                            : 'Sin estudiantes'} 
                        </Text>
                    </View>
                    )}

                    renderSectionHeader={({ section: { title } }) => (
                    <View style={stylesAdmin.sectionHeaderContainer}>
                        <Text maxFontSizeMultiplier={1} style={stylesAdmin.sectionHeaderText}>{title}</Text>
                    </View>
                    )}
                    ListEmptyComponent={
                        <Text maxFontSizeMultiplier={1} style={stylesAdmin.loadingText}>No hay listas de asistencia</Text>
                    }
                />
            )}
        </View>
    );
};

export default AttendanceListScreen;
