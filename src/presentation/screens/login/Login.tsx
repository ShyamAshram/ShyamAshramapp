import React, { useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Inicio } from '../../components/ui/Inicio';
import Footer from '../../components/ui/Foot';
import { HOST_URL } from '../../../../utils/envconfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
export const Login = () => {
  const insets = useSafeAreaInsets();

  useEffect(()=>{
    console.log('HOSTTTTT', HOST_URL)
  })


  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={style.containerMain}>
      
      <Inicio />
      <View style={[style.Foot, { paddingBottom: insets.bottom }]}>
        <Footer />
      </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  containerMain: {
    height:height, 
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Foot: {
    position: 'relative',
    backgroundColor: 'white',
    borderWidth: 0,
  },
});