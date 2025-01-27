import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import { Book, Notification, Set } from '../../icons/Icons';
import { Title } from '../../components/ui/Title';
import { globalStyles } from "../../../config/theme/Theme";
import { Profile } from "../profile/Profile";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageSlider from "../../components/ui/Slide";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { differenceInDays } from 'date-fns';

import Plans from "../plans/Plans";
import Plan2 from "../plans/Plan2"
import Plan3 from "../plans/Plan3";
import { Class } from "../class/Class";
import { Alerts } from "../notifications/Notification";
import Footer from "../../components/ui/Foot";

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState('');
  const [progress, setProgress] = useState(0);
  const [plan, setPlan] = useState('');
  const [planDuration, setPlanDuration] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    getUserDetails();
    const interval = setInterval(() => {
      getUserDetails();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get('http://10.0.2.2:3001/api/users/me', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const userData = response.data;

      setUserName(userData.name);
      setPlan(userData.plan);
      setPlanDuration(userData.planDuration);

      const totalPlanDuration = calculateTotalPlanDuration(userData.plan);

      const startDate = new Date(userData.planStartDate);
      const currentDate = new Date();

      // Si el plan es ilimitado, calcula el progreso basado en días restantes
      if (userData.plan === 'Ilimitado') {
        const daysPassed = Math.min(
          differenceInDays(currentDate, startDate),
          totalPlanDuration
        );
        const progressValue = 1 - daysPassed / totalPlanDuration;
        setProgress(progressValue);
        setDaysLeft(totalPlanDuration - daysPassed);
      } else {
        // Para planes limitados, calcula el progreso basado en clases restantes
        const progressValue = userData.planDuration / totalPlanDuration;
        setProgress(progressValue);
        setDaysLeft(userData.planDuration);
      }

      const unreadNotificationsCount = userData.notifications.filter((notification: { read: any; }) => !notification.read).length;
      setUnreadNotifications(unreadNotificationsCount);

    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
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

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={globalStyles.header}>
        <Title text={`Bienvenido, ${userName}`} />
        <View style={globalStyles.profileImageContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Profile)} style={globalStyles.profileImage}>
            <Set />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={globalStyles.globalMargin}>
        <Pressable style={globalStyles.buttonOver}>
          <Text style={globalStyles.planText}>ESTADO</Text>
        </Pressable>
        <View style={[globalStyles.progressContainer, globalStyles.shadowProp]}>
          <Text style={globalStyles.progressText}>Progreso de tu suscripción:</Text>
          <Progress.Bar
            progress={progress}
            width={null}
            height={10}
            color='#26834e'
            unfilledColor='#e0e0e0'
            borderRadius={5}
            borderWidth={0}
          />
          <View style={globalStyles.progText}>
            <Text style={globalStyles.progressText}>Plan:<Text style={{ color: '#D9A404' }}> {plan} </Text></Text>
            <Text style={globalStyles.progressText}>Días restantes: <Text style={{ color: '#D9A404' }}>{daysLeft} días</Text></Text>
          </View>
        </View>
        <View style={globalStyles.intoEnd}>
          <TouchableOpacity style={globalStyles.containerIcons} onPress={() => navigation.navigate(Class)}>
            <Book />
            <Text style={globalStyles.optionText}>Class schedules</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.containerIconsA} onPress={() => navigation.navigate(Alerts)}>
            <Notification />
            <Text style={globalStyles.optionText}>Notification</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.containermid}>
          <ImageSlider />
        </View>
        <Pressable style={globalStyles.buttonOver}>
          <Text style={globalStyles.planText}>PLANES</Text>
        </Pressable>
        <View style={globalStyles.menu}>
          <View style={globalStyles.containerplans}>
            <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plans)}>
              <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo1.png")} />
              <Text style={globalStyles.textPlan}>ILIMITADO</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.containerplans}>
            <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan2)}>
              <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo2.png")} />
              <Text style={globalStyles.textPlan}>4 CLASES</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.containerplans}>
            <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan3)}>
              <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo3.png")} />
              <Text style={globalStyles.textPlan}>ESTUDIANTES</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.containerplans}>
            <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan3)}>
              <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo3.png")} />
              <Text style={globalStyles.textPlan}>ANUALIDAD</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.containerplans}>
            <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan3)}>
              <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo3.png")} />
              <Text style={globalStyles.textPlan}>6 MESES</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.containerplans}>
            <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan3)}>
              <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo3.png")} />
              <Text style={globalStyles.textPlan}>3 MESES</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
