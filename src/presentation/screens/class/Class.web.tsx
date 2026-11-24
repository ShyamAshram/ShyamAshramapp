
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { globalStyles } from '../../../config/theme/Theme';
import ClassSchedule from '../../components/ui/Horario';
import Footer from '../../components/ui/Foot';
import Logo from '../../assets/logo.svg?url';
import BackButton from '../../components/ui/BackButton.web';

export const Class = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={globalStyles.mainContainer}>
      <View
        style={[
          styles.header,
          { marginTop: insets.top +20 },
        ]}
      >
        <BackButton fallback="Class" />
        <Image
          source={{ uri: Logo }}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>

      <View style={styles.scheduleContainer}>
        <ClassSchedule />
      </View>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom },
        ]}
      >
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
  scheduleContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
