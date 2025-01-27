import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { globalStyles } from '../../../config/theme/Theme'
import { ScrollView } from 'react-native-gesture-handler';
import NotificationUi from '../../components/ui/Notis';

export const Alerts = () => {

    return (
        <SafeAreaView style={globalStyles.mainContainer}>
            <View>
                <NotificationUi />
            </View>
        </SafeAreaView>
    )

}