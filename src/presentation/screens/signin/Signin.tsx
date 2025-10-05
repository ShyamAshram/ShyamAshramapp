import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Registro } from '../../components/ui/Registro';
import Footer from '../../components/ui/Foot';

export const Signin = () => {


  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={style.containerMain}>
        <Registro />
        <View>
          <Footer />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  },



});