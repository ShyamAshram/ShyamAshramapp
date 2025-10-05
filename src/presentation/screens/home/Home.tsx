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
import Plan4 from "../plans/Plan4";
import Plan5 from "../plans/Plan5";
import Plan6 from "../plans/Plan6";
import { HOST_URL } from "../../../../utils/envconfig";

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState('');
  const [birtday, setBirtday] = useState(null)
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

      const response = await axios.get(`${HOST_URL}/api/users/me`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const userData = response.data;


      setUserName(userData.name);
      setPlan(userData.plan);
      setPlanDuration(userData.planDuration);

      const totalPlanDuration = calculateTotalPlanDuration(userData.planDuration);
      const startDate = new Date(userData.planStartDate);
      const currentDate = new Date();
      const total =  Number(userData.planTotalDuration) ?? totalPlanDuration; 
      const remaining = Number(userData.planDuration) ?? 0;

      console.log({ total, remaining });
      // if (userData.plan === 'Ilimitado') {
      //   const daysPassed = Math.min(
      //     differenceInDays(currentDate, startDate),
      //     totalPlanDuration
      //   );
      //   if(total>0 && remaining>0){}
      //   const progressValue =Math.round(remaining *100 / total);

      //   console.log( progressValue );
      //   setProgress(progressValue);
      //   setDaysLeft(totalPlanDuration - daysPassed);
      // } else {
        if(total>0 && remaining>0){
        const progressValue = Math.round(remaining *100 / total);
        console.log( progressValue );

        setProgress(progressValue);
        setDaysLeft(userData.planDuration);
        } else {
          setProgress(0);
          setDaysLeft(0);
        }
      // }

      const unreadNotificationsCount = userData.notifications.filter((notification: { read: any; }) => !notification.read).length;
      setUnreadNotifications(unreadNotificationsCount);

    } catch (error) {
      console.log('Error al obtener los detalles del usuario:', error);
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
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      navigation.navigate('Landing');
    } catch (error) {
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={globalStyles.header}>
        <View style={{ justifyContent:'center', alignItems:'center'}}>
        <Title text={`Bienvenido, ${userName}`} />
        </View>
          <TouchableOpacity onPress={handleLogout} style={globalStyles.profileImage}>
            <Set />
          </TouchableOpacity>
      </View>
      <ScrollView style={globalStyles.globalMargin}>
        <View style={[globalStyles.progressContainer, globalStyles.shadowProp]}>
          <Text style={globalStyles.progressText}>Tu suscripción tiene el {progress}% para tus clases</Text>
          <Progress.Bar
            progress={progress/100}
            width={null}
            style={{ elevation:10,}}
            height={10}
            color='#23632cff'
            unfilledColor='#fff6f6ff'
            borderRadius={5}
            borderWidth={0}
          />
          <View style={globalStyles.progText}>
            <Text style={globalStyles.progressText}>Plan:<Text style={{fontFamily:'Quicksand-Bold', color: '#D9A404', fontSize: 15 }}> {plan} </Text></Text>
            <Text style={globalStyles.progressText}>Días restantes: <Text style={{ fontFamily:'Quicksand-Bold',color: '#D9A404', fontSize: 15 }}>{daysLeft} días</Text></Text>
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
        <View style={{ flexDirection: 'column' }}>
          <View style={globalStyles.menu}>
            <View style={globalStyles.containerplans}>
              <View style={{ height:25, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={globalStyles.textPlan}>ANUALIDAD</Text>
              </View>
              <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan4)}>
                <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo1.png")} />
              </TouchableOpacity>
            </View>
            <View style={globalStyles.containerplans}>
              <View style={{ height:25, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={globalStyles.textPlan}>6 MESES</Text>
              </View>
              <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan5)}>
                <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo6.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={globalStyles.menu}>
            <View style={globalStyles.containerplans}>
              <View style={{ height:25, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={globalStyles.textPlan}>3 MESES</Text>
              </View>
              <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan6)}>
                <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo5.png")} />
              </TouchableOpacity>
            </View>
            <View style={globalStyles.containerplans}>
              <View style={{ height:25, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={globalStyles.textPlan}>ILIMITADO</Text>
              </View>
              <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plans)}>
                <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo7.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={globalStyles.menu}>
            <View style={globalStyles.containerplans}>
              <View style={{ height:25, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={globalStyles.textPlan}>4 CLASES</Text>
              </View>
              <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan2)}>
                <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo4.png")} />
              </TouchableOpacity>
            </View>
            <View style={globalStyles.containerplans}>
              <View style={{ height:25, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={globalStyles.textPlan}>1 Clase</Text>
              </View>
              <TouchableOpacity style={globalStyles.buttonsPlans} onPress={() => navigation.navigate(Plan3)}>
                <Image style={globalStyles.imageBoton} source={require("../../assets/Fondo8.png")} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};