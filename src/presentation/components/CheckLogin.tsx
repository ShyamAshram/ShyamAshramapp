import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CheckLogin = () => {

    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();
    useEffect(() => {
        const checkSession = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const role = await AsyncStorage.getItem('role');


                if (token && role) {
                    switch (role) {
                        case 'admin':
                            navigation.replace('Admin');
                            break;
                        case 'profe':
                            navigation.replace('Prof');
                            break;
                        default:
                            navigation.replace('HomeScreen');
                    }
                } else {
                    navigation.replace('Landing');
                }
            } catch (error) {
                console.error('Error checking session:', error);
                navigation.replace('Landingn');
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#5A215E" />
            </View>
        );
    }

    return null;
};

export default CheckLogin;
