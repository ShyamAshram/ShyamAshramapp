import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL } from '../../../../../utils/envconfig';
import { getNextDateForDay } from '../service';
import { Alert } from 'react-native';

interface ClassSchedule {
  _id: string;
  name: string;
  dayOfWeek: string;
  time: string;
  instructorId: {
    name: string;
    email: string;
  };
}

export const useClassSchedules = (dayOfWeek: string) => {
  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);
const [userRegistrations, setUserRegistrations] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nextDate = getNextDateForDay(dayOfWeek);

  const fetchClassSchedules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${HOST_URL}/api/classes/${dayOfWeek}`
      );

      setClassSchedules(response.data ?? []);
    } catch (err: any) {
      console.error('Error fetching schedules:', err);
      setError('Error cargando horarios');
    } finally {
      setLoading(false);
    }
  }, [dayOfWeek]);

const handleClassRegistration = useCallback(
  async (classId: string) => {
    if (userRegistrations.includes(classId)) {
      return { alreadyRegistered: true };
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(
        `${HOST_URL}/api/classes/registerClass`,
        { classId, dayOfWeek },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserRegistrations(prev => [...prev, classId]);

      return {
        success: true,
        date: response.data.date,
      };

    } catch (error) {
      return { success: false };
    }
  },
  [dayOfWeek, userRegistrations]
);
  useEffect(() => {
    fetchClassSchedules();
  }, [fetchClassSchedules]);

  return {
    classSchedules,
    loading,
    error,
    userRegistrations,
    refetch: fetchClassSchedules,
    handleClassRegistration,
  };
};