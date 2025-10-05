import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { HOST_URL } from '../../../../utils/envconfig';

interface User {
  _id: string;
  name: string;
  role: string; 
}

interface ClassSchedule {
  _id: string;
  name: string;
  dayOfWeek: string;
  time: string;
}

export const Profesores = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [selectedClasses, setSelectedClasses] = useState<{ [key: string]: string[] }>({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const usersRes = await axios.get(`${HOST_URL}/api/users/users`, {
          headers: { Authorization: "Bearer " + token },
        });
        const profs = usersRes.data.filter((u: User) => u.role === "profe");
        setUsers(profs);

        const schedulesRes = await axios.get(`${HOST_URL}/api/classes/all`, {
          headers: { Authorization: "Bearer " + token },
        });
        const schedulesData = schedulesRes.data;
        setSchedules(schedulesData);

        const initSelected: { [key: string]: string[] } = {};
        profs.forEach((profe: User) => {
          const assigned = schedulesData
            .filter((s: any) => s.instructorId === profe._id)
            .map((s: any) => s._id);
          initSelected[profe._id] = assigned;
        });
        setSelectedClasses(initSelected);
      } catch (err) {
        console.error("Error al cargar datos", err);
      }
    };


    fetchData();
  }, []);

  const assignClass = async (teacherId: string, classId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${HOST_URL}/api/classes/assign-class`,
        {  teacherId, classId },
        { headers: { Authorization: "Bearer " + token } }
      );
    } catch (err) {
      console.error("Error asignando clase:", err);
    }
  };
  const unassignClass = async (classId: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${HOST_URL}/api/classes/unassign-class`,
      { classId },
      { headers: { Authorization: "Bearer " + token } }
    );
  } catch (err) {
    console.error("Error desasignando clase:", err);
  }
};

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(user) => user._id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View style={{justifyContent:'center', alignItems:'center', marginBottom:10, borderWidth:2, borderColor:'#5a215e', padding:5, borderRadius:25,}}>
              <Text style={styles.userText}>{item.name}</Text>
            </View> 
            <DropDownPicker
              multiple={true} 
              max={10}
              listMode="SCROLLVIEW"
              dropDownDirection="AUTO"

              open={openDropdowns[item._id] || false}
              value={selectedClasses[item._id] || []}
              setOpen={(open) =>
                setOpenDropdowns((prev: any) => ({ ...prev, [item._id]: open }))
              }
              setValue={(callback) => {
                setSelectedClasses((prev) => {
                  // Resolvemos el valor real a partir de lo que DropDownPicker nos dé
                  const newValue = typeof callback === "function"
                    ? callback(prev[item._id] || [])
                    : callback;

                  const updated = { ...prev, [item._id]: newValue };

                  schedules.forEach((s) => {
                    const alreadyAssigned = prev[item._id]?.includes(s._id);
                    const nowAssigned = newValue.includes(s._id);

                    if (!alreadyAssigned && nowAssigned) {
                      assignClass(item._id, s._id);
                    } else if (alreadyAssigned && !nowAssigned) {
                      unassignClass(s._id);
                    }
                  });

                  return updated;
                });
              }}

              items={schedules.map((s) => ({
                label: `${s.dayOfWeek} - ${s.time}`,
                value: s._id,
              }))}
              placeholder="Selecciona horarios"
              multipleText={(selectedClasses[item._id]?.length || 0) > 0
                ? `${selectedClasses[item._id].length} horarios seleccionados`
                : "Selecciona horarios"}
              style={{ borderColor: "#5a215e", backgroundColor: "#FFF", borderWidth: 3 }}
              dropDownContainerStyle={{
                backgroundColor: "#fff",
                position: "absolute",
                zIndex: 2000,
                maxHeight: 600,
              }}
              containerStyle={{
                marginBottom: openDropdowns[item._id] ? 350 : 20,
                position: "relative",
                zIndex: 3000,
              }}
            />

          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  userContainer: {
    marginBottom: 25,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});
