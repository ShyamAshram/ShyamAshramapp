import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Registro } from '../../components/ui/Registro';
import Footer from '../../components/ui/Foot';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';
import { Arrow } from '../../icons/Icons';
import { useNavigation } from '@react-navigation/native';

const{width, height} = Dimensions.get('window');

export const Signin = () => {
  const navigation = useNavigation();
  const inset  = useSafeAreaInsets();


  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={{ position: 'absolute', top: inset.top, left: 20, zIndex: 1 }  } onPress={() => navigation.goBack()}>
        <Arrow />
      </TouchableOpacity>
      <View style={style.containerMain}>
        <Registro />
        <View style={{ width:'90%', position:'absolute', bottom:0, backgroundColor:'white', paddingBottom: inset.bottom }}>
          <Footer />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  containerMain: {
    width: width,
    height: height,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },



});