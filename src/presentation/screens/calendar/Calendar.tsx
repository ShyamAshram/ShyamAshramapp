import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Svg, Rect } from 'react-native-svg';
import { Calendar } from "react-native-calendars";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../../../config/theme/Theme";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL } from "../../../../utils/envconfig";

export const Dates = () => {
  const [userName, setUserName] = useState('');
  const [progress, setProgress] = useState(0);
  const [plan, setPlan] = useState('');
  const [planDuration, setPlanDuration] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [selected, setSelected] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    fetchAttendanceDates();
    const interval = setInterval(() => { fetchAttendanceDates() }, 10000);
    return () => clearInterval(interval)

  }, []);

  const fetchAttendanceDates = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(`${HOST_URL}/api/users/date`, {
        headers: {
          'Authorization': 'Bearer ' + token

        }

      });


      const attendanceDates = response.data;
      console.log(attendanceDates)
      const marked: { [key: string]: any } = {};
      attendanceDates.forEach((att: { date: string; attended: boolean }) => {
        marked[att.date] = {
          selected: true,
          marked: true,
          selectedColor: att.attended ? 'green' : 'red',
        };
      });

      setMarkedDates(marked);
    } catch (error) {
      console.error('Error al obtener las fechas de asistencia:', error);
    }
  };

  const handleDayPress = (day: { dateString: string }) => {
    setSelected(day.dateString);
    setMarkedDates(prevMarkedDates => ({
      ...prevMarkedDates,
      [day.dateString]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
      },
    }));
  };

  return (
    <SafeAreaView style={style.maincontaine}>
      <Svg height="20%" width="100%" viewBox="0 0 100 100">
        <Rect x="-80" y="0" width="260" height="270" strokeWidth="1" fill="#5A215E" />
      </Svg>
      <View style={[globalStyles.globalMargin]}>
        <View style={globalStyles.containermid}>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: '#000000',
              height: 350,
              width: 350,
              justifyContent: 'center',
            }}
            theme={{
              backgroundColor: '#000000',
              textSectionTitleColor: '#000000',
              selectedDayBackgroundColor: 'purple',
              selectedDayTextColor: '#000000',
              todayTextColor: '#000000',
              dayTextColor: '#000000',
              textDisabledColor: '#000000',
              dotColor: 'purple',
              selectedDotColor: '#000000',
              arrowColor: '#000000',
              monthTextColor: '#000000',
            }}
            onDayPress={handleDayPress}
            markedDates={markedDates}
          />
          <View style={globalStyles.notification}>
            <Text style={globalStyles.notificationText}>
              Tienes pocas clases en tu calendario.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  maincontaine: {
    flex: 1,
    height: 'auto',
  },
});
