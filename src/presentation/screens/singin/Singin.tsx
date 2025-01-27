import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Inicio } from '../../components/ui/Inicio';
import Footer from '../../components/ui/Foot';

export const Signin = () => {
  return (
    <KeyboardAvoidingView
      style={style.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Inicio />
      <View style={style.Foot}>
        <Footer />
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
    alignItems: 'center',
  },
  Foot: {
    position: 'relative',
    justifyContent: 'flex-end',
  },
});