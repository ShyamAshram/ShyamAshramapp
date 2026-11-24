
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Registro } from '../../components/ui/Registro';
import Footer from '../../components/ui/Foot';
import { Arrow } from '../../icons/Icons';

export const Signin = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container, { minHeight: height }]}>
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Arrow />
      </TouchableOpacity>

      <View style={styles.content}>
        <Registro />
      </View>

      <View style={{ paddingBottom: insets.bottom }}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  content: {
    width: '100%',
    flex: 1,
  },
});

export default Signin;
