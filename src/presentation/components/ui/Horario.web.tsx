
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendario } from '../../icons/Icons';
const{width, height} = Dimensions.get('window');

const days = [
  { label: 'LUNES', screen: 'Lunes1' },
  { label: 'MARTES', screen: 'Martes1' },
  { label: 'MIÉRCOLES', screen: 'Miercoles1' },
  { label: 'JUEVES', screen: 'Jueves1' },
  { label: 'VIERNES', screen: 'Viernes1' },
  { label: 'SÁBADO', screen: 'Sabado1' },

];  

export default function Horario() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  const numColumns = width > 800 ? 3 : width > 520 ? 2 : 1;

  const itemWidth = numColumns === 1
    ? width * 0.87
    : `${100 / numColumns - 5}%`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HORARIOS DE CLASES</Text>

      <FlatList
        key={numColumns}
        data={days}
        numColumns={numColumns}
        keyExtractor={(item) => item.screen}
        contentContainerStyle={styles.list}
        columnWrapperStyle={
          numColumns > 1 ? styles.row : undefined
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dayButton, { width: itemWidth as any }]}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.8}
          >
            <Calendario color="#FFFFFF" />
            <Text style={styles.dayText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    color: '#5a215e',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  list: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'center',
    width: '100%',
    gap: 15,
  },
  dayButton: {
    minHeight: 110,
    marginBottom: 15,
    borderRadius: 16,
    backgroundColor: '#D9A404',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
});
