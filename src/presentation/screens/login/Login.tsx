import React, { useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Inicio } from '../../components/ui/Inicio';
import Footer from '../../components/ui/Foot';
import { HOST_URL } from '../../../../utils/envconfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Arrow } from '../../icons/Icons';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
export const Login = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(()=>{
    console.log('HOSTTTTT', HOST_URL)
  })


  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableOpacity style={{ position: 'absolute', top: insets.top, left: 20, zIndex: 1 }  } onPress={() => navigation.goBack()}>
        <Arrow />
      </TouchableOpacity>
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