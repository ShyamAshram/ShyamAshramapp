
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Book, Notification, Set } from '../../icons/Icons';
import { Title } from '../../components/ui/Title';
import ImageSlider from '../../components/ui/Slide';
import Footer from '../../components/ui/Foot';

import { globalStyles } from '../../../config/theme/Theme';
import { HOST_URL } from '../../../../web/env.web';

import Fondo1 from '../../assets/Fondo1.png';
import Fondo6 from '../../assets/Fondo6.png';
import Fondo5 from '../../assets/Fondo5.png';
import Fondo7 from '../../assets/Fondo7.png';
import Fondo4 from '../../assets/Fondo4.png';
import Fondo8 from '../../assets/Fondo8.png';

const planCards = [
  { title: 'ANUALIDAD', planName: 'Anualidad', route: 'Plan4', image: (Fondo1 )},
  { title: '6 MESES', planName: '6 meses', route: 'Plan5', image: Fondo6 },
  { title: '3 MESES', planName: '3 meses', route: 'Plan6', image: Fondo5 },
  { title: 'ILIMITADO', planName: 'Mensualidad Ilimitada', route: 'Plans', image: Fondo7 },
  { title: '4 CLASES', planName: '4 clases', route: 'Plan2', image: Fondo4 },
  { title: '1 Clase', planName: 'Clase Individual', route: 'Plan3', image: Fondo8 },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  console.log('IMÁGENES:', {
    Fondo1,
    Fondo6,
    Fondo5,
    Fondo7,
    Fondo4,
    Fondo8,
  });

  const [hasNotification, setHasNotification] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [progress, setProgress] = useState(0);
  const [plan, setPlan] = useState('');
  const [daysLeft, setDaysLeft] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [plans, setPlans] = useState<any[]>([]);

  const getPlans = async () => {
    try {
      const response = await fetch(`${HOST_URL}/api/plans`);

      if (!response.ok) {
        throw new Error(`Error al obtener planes: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.log('Error al obtener los planes:', error);
      return [];
    }
  };

  const calculateTotalPlanDuration = (selectedPlan: string) => {
    switch (selectedPlan) {
      case 'Ilimitado':
        return 30;
      case '4 clases':
        return 4;
      case '1 clase':
        return 1;
      case 'No tienes un plan':
        return 1;
      default:
        return 30;
    }
  };

  const getUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(`${HOST_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      const notifications = Array.isArray(userData.notifications)
        ? userData.notifications
        : [];

      setHasNotification(notifications.length > 0);
      setNotificationCount(notifications.length);
      setUserId(userData.id);
      setUserName(userData.name);
      setPlan(userData.plan);
      setProgress(0);
      setDaysLeft(0);

      const totalPlanDuration =
        Number(userData.planTotalDuration) ||
        calculateTotalPlanDuration(userData.planDuration);

      const remaining = Number(userData.planDuration) || 0;

      if (totalPlanDuration > 0 && remaining > 0) {
        setProgress(
          Math.min(100, Math.round((remaining * 100) / totalPlanDuration)),
        );
        setDaysLeft(remaining);
      }

      const unreadCount = notifications.filter(
        (notification: { read?: boolean }) => !notification.read,
      ).length;

      // Se conserva el cálculo de notificaciones no leídas.
      // El indicador visual muestra el total de notificaciones,
      // igual que en la pantalla original.
      void unreadCount;
    } catch (error) {
      console.log('Error al obtener los detalles del usuario:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadPlans = async () => {
      const data = await getPlans();

      if (mounted) {
        setPlans(data);
      }
    };

    loadPlans();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    getUserDetails();

    const interval = setInterval(() => {
      getUserDetails();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      navigation.navigate('Landing');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  const handlePlansNav = (planName: string, routeName: string) => {
    const selectedPlan = plans.find(
      (item: any) => item.name === planName,
    );

    if (!selectedPlan) {
      console.log(`No se encontró el plan: ${planName}`);
      return;
    }

    navigation.navigate(routeName, {
      planId: selectedPlan._id,
      userId,
      plan: selectedPlan,
    });
  };

  return (
    <View style={globalStyles.mainContainer}>
      {/* HEADER */}
      <View
        style={[
          globalStyles.header,
          { paddingTop: insets.top },
        ]}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
          }}
        >
          <Title text={`Bienvenido, ${userName}`} />
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={globalStyles.profileImage}
        >
          <Set />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={globalStyles.globalMargin}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* PROGRESO DEL PLAN */}
        <View
          style={[
            globalStyles.progressContainer,
            globalStyles.shadowProp,
          ]}
        >
          <Text
            maxFontSizeMultiplier={1}
            style={globalStyles.progressText}
          >
            Tu suscripción tiene el {progress}% para tus clases
          </Text>

          <View
            style={{
              width: '100%',
              height: 10,
              backgroundColor: '#fff6f6ff',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#23632cff',
                borderRadius: 5,
              }}
            />
          </View>

          <View style={globalStyles.progText}>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Text style={globalStyles.progressText}>Plan</Text>

              <Text
                style={{
                  fontFamily: 'Quicksand-Bold',
                  color: '#D9A404',
                  fontSize: 15,
                }}
              >
                {plan}
              </Text>
            </View>

            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Text style={globalStyles.progressText}>
                Días restantes
              </Text>

              <Text
                style={{
                  fontFamily: 'Quicksand-Bold',
                  color: '#D9A404',
                  fontSize: 15,
                }}
              >
                {daysLeft} días
              </Text>
            </View>
          </View>
        </View>

        {/* ACCESOS PRINCIPALES */}
        <View style={globalStyles.intoEnd}>
          <TouchableOpacity
            style={globalStyles.containerIcons}
            onPress={() => navigation.navigate('Class')}
          >
            <Book />
            <Text style={globalStyles.optionText}>
              Class schedules
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.containerIconsA}
            onPress={() => navigation.navigate('Alerts')}
          >
            <Notification
              color={hasNotification ? '#daeb44ff' : '#fff'}
            />

            {notificationCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -5,
                  left: 90,
                  backgroundColor: 'red',
                  width: 15,
                  height: 15,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}
                >
                  {notificationCount}
                </Text>
              </View>
            )}

            <Text style={globalStyles.optionText}>
              Notification
            </Text>
          </TouchableOpacity>
        </View>

        {/* SLIDER */}
        <View style={globalStyles.containermid}>
          <ImageSlider />
        </View>

        {/* PLANES */}
        <Pressable style={globalStyles.buttonOver}>
          <Text style={globalStyles.planText}>PLANES</Text>
        </Pressable>

        <View style={{ flexDirection: 'column', gap:25 }}>
          {Array.from({ length: 3 }, (_, rowIndex) => (
            <View key={rowIndex} style={globalStyles.menu}>
              {planCards
                .slice(rowIndex * 2, rowIndex * 2 + 2)
                .map(item => (
                  <View
                    key={item.route}
                    style={globalStyles.containerplans}
                  >
                    <View
                      style={{
                        height: 25,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={globalStyles.textPlan}>
                        {item.title}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        globalStyles.buttonsPlans,
                        { direction: 'ltr', gap:10  },
                      ]}
                      onPress={() =>
                        handlePlansNav(item.planName, item.route)
                      }
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{height: 100, width: 190, borderRadius: 20}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingBottom: insets.bottom,
          }}
        >
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
