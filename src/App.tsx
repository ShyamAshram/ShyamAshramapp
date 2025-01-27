
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './presentation/navigator/Navigator';
import 'react-native-gesture-handler';




export const App = ()=>  {

  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
    );
};



