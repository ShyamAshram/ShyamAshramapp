import React, { useState, useEffect, SetStateAction } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';
import { Clock, Email, Form } from '../../icons/Icons';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL } from '../../../../utils/envconfig';
import DropDownPicker from 'react-native-dropdown-picker';
import stylesAdmin from './styles/stylesAdmin';

interface Props {
    visible: boolean;
    data:any
    onClose: () => void;

}
interface ClassSchedule {
  _id: string;
  name: string;
  dayOfWeek: string;
  time: string;
  instructor: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  planDuration: number;
  role: string; 
}

const AsignPlaPro: React.FC<Props> = ({data,  visible, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
      const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
        const [selectedPlan, setSelectedPlan] = useState<{ [key: string]: string }>({});
      
    
      
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
    
    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${HOST_URL}/api/users/users`, {
            headers: { 'Authorization': 'Bearer ' + token }
            });
            const usersWithRoleUser = response.data.filter((user: { role: string; }) => user.role === 'user');
            setUsers(usersWithRoleUser);
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


    const [role] = useState('');


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
      const getOpenSetter = (userId: string) => (callback: SetStateAction<boolean>) => {
      setOpenDropdowns(prev => ({
        ...prev,
        [userId]: typeof callback === 'function' ? callback(prev[userId] || false) : callback,
      }));
    };

    return (
        <Modal transparent visible={visible} animationType="slide" presentationStyle='overFullScreen'>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <TextInput
                    maxFontSizeMultiplier={1}
                    style={stylesAdmin.searchInput}
                    placeholder="Buscar usuarios..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    />
                    
                        <>
                    <Text style={styles.title}>Asignar Plan al Estudiante</Text>
                {searchQuery.length >= 3 && (
                    <FlatList
                        data={filteredUsers}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:10}}
                        style={{borderWidth:0, padding:8}}

                        keyExtractor={user => user._id}
                        renderItem={({ item, index }) => (
                        <View style={[stylesAdmin.userContainerAsignacion,  { zIndex: 1}] }>
                            <View style={stylesAdmin.badgeName}>
                                <Text maxFontSizeMultiplier={1} style={stylesAdmin.userText}>{item.name}</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'center', gap:10,}}>
                                <View style={stylesAdmin.badgePlanprofe}>
                                {item.plan !== 'No tienes un plan' && 
                                    <Form color= {'green'} size={20}/>
                                }
                                <Text maxFontSizeMultiplier={1} style={[stylesAdmin.userText, {color:item.plan === 'No tienes un plan' ? 'red': 'green'}]}> {item.plan}</Text>
                                </View>
                            </View>
                            {item.plan !== 'No tienes un plan' && 
                            <View style={stylesAdmin.badgeDias}>
                                <Clock/>
                                <Text maxFontSizeMultiplier={1} style={stylesAdmin.userTextDias}>{item.planDuration} días</Text>
                            </View>
                            } 
                            <DropDownPicker
                                zIndex={1000}
                                    zIndexInverse={3000}
                                    listMode='SCROLLVIEW'
                                    dropDownDirection='AUTO'
                                    open={openDropdowns[item._id] || false}
                                    setOpen={getOpenSetter(item._id)} 
                                    value={selectedPlan[item._id] || null}
                                    setValue={(callback) => {
                                    const value = typeof callback === 'function' ? callback(selectedPlan[item._id]) : callback;
                                    const duration = planesConDuracion[value as PlanNombre];
                                    if (typeof duration === 'number') {
                                        updateUserPlan(item._id, value, duration);
                                        setSelectedPlan(prev => ({ ...prev, [item._id]: value }));
                                    }
                                

                                    }}
                                    items={uniquePlanes}
                                    placeholder="Selecciona un plan"
                                    style={{ borderColor: '#5a215e',backgroundColor: '#FFF', borderWidth:3}}
                                    dropDownContainerStyle={{  backgroundColor: '#fff',  position: 'absolute', zIndex: 2000, maxHeight:600, }}
                                    containerStyle={{ marginBottom: openDropdowns[item._id] ? 320 : 20, position: 'relative', zIndex: 3000,}}
                                    textStyle={{fontSize:10, fontFamily:'Quicksand-Bold'}}
                                />
                            </View>
                            )}
                        />
                    )}
                    
                    
                    <View style={styles.buttonContainer2}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>

                    </View>
                    </>

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

export default AsignPlaPro;
