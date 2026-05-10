import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity,} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../config/theme/Theme';
import { HOST_URL } from '../../../../utils/envconfig';
import stylesAdmin from './styles/stylesAdmin';
import { Arrow, Check, Close, Download, Form, ListForm, Profesores } from '../../icons/Icons';
import { useNavigation } from '@react-navigation/native';


interface AttendanceGroup {
    title: string;
    data: any[];
}

const AttendanceListScreen = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [attendanceLists, setAttendanceLists] = useState<AttendanceGroup[]>([]);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

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
                console.log(response)

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
                <View style={{borderWidth:0, borderColor:'#fff', width:'100%', height:30, flexDirection: 'row', alignItems: 'center', justifyContent:'center', gap:10}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Arrow color='#FFF' />
                    </TouchableOpacity>
                    <View style={{width:'85%'}}>
                        <Text maxFontSizeMultiplier={1} style={stylesAdmin.title}>Listas de Asistencia</Text>
                    </View>
                </View>
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
                        <View style={{borderWidth:0, marginBottom:2,}}>
                            {item.students && Array.isArray(item.students) ? (
                                item.students.map((s: any) => (
                                <View
                                    key={s._id}
                                    style={{
                                    borderColor: '#ddd',
                                    borderWidth:1, 
                                    marginTop:8,
                                    borderRadius:10,
                                    padding:5,
                                    justifyContent:'flex-start',
                                    alignItems:'center',
                                    flexDirection:'row',
                                    gap:8
                                    }}
                                >
                                    <View style={{width:'80%'}}>
                                        <Text style={stylesAdmin.cardSubtitle}>
                                        {s.userName}
                                        </Text>

                                        <Text style={stylesAdmin.cardSubtitle}>
                                        {s.userEmail}
                                        </Text>
                                    </View>
                                    <View style={{borderWidth:0, width:'15%', height:'100%', alignItems:'center' }} >
                                        {s.attended ? ( 
                                            <Check />
                                        ):(
                                            <Close />
                                        )}
                                    </View>
                                    
                                    
                                </View>
                                
                                ))
                            ) : (
                                <Text style={stylesAdmin.cardSubtitle}>Sin estudiantes</Text>
                            )}
                            </View>
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
