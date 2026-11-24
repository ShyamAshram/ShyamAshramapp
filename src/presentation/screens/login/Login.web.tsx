
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Inicio } from '../../components/ui/Inicio';
import Footer from '../../components/ui/Foot';
import { Arrow } from '../../icons/Icons';

export const Login = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container, { minHeight: height }]}>
      <TouchableOpacity
        style={[styles.backButton, { top: Math.max(insets.top, 12) }]}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Volver"
      >
        <Arrow />
      </TouchableOpacity>

      <View style={styles.content}>
        <Inicio />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    width: '90%',
    height: 90,
    backgroundColor: 'white',
  },
});

export default Login;
