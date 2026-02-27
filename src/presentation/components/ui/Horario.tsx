import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendario } from '../../icons/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 30;

const ClassSchedule = () => {
  const navigation = useNavigation<any>();
  const numColumns = width > 600 ? 3 : 2;

  const days = useMemo(
    () => [
      { label: 'LUNES', screen: 'Lunes1' },
      { label: 'MARTES', screen: 'Martes1' },
      { label: 'MIÉRCOLES', screen: 'Miercoles1' },
      { label: 'JUEVES', screen: 'Jueves1' },
      { label: 'VIERNES', screen: 'Viernes1' },
      { label: 'SÁBADO', screen: 'Sabado1' },
    ],
    []
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.buttonday}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Calendario />
      <Text maxFontSizeMultiplier={1} style={styles.day}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
     <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={days}
        keyExtractor={(item) => item.screen}
        renderItem={renderItem}
        numColumns={numColumns}
        style={{ width: '100%' }}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.scheduleContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:width * 0.9,
    height:'100%',
    borderWidth:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    borderWidth:0, 
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  scheduleContainer: {
    width: '100%', 
    paddingTop: 40,
  },
  day: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    marginLeft: 10,
    color: '#FFF',
  },
  buttonday: {
    width: ITEM_WIDTH,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#D9A404',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default ClassSchedule;