import React, { Component } from 'react'
import { Svg, Rect } from 'react-native-svg';
import { Text, View, SafeAreaView } from 'react-native'
import { globalStyles } from '../../../config/theme/Theme'
import { ScrollView } from 'react-native-gesture-handler';
import SubscriptionSettingsScreen from '../../components/ui/Subscription';

export const Sub = () => {

    return (
        <SafeAreaView style={globalStyles.mainContainer}>
            <Svg height="15%" width="100%" viewBox="0 0 100 100" >
                <Rect x="-300" y="0" width="1000" height="220" strokeWidth="1" fill="#5A215E" />
            </Svg>
            <View style={[globalStyles.globalMargin]}>
                <ScrollView>
                    <SubscriptionSettingsScreen />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};