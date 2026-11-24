
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Facebook, Instagram } from '../../icons/Icons';
import { style } from './style';
import LogoUrl from '../../assets/logo.svg?url';


const{width, height} = Dimensions.get('window');


function Landing(): React.JSX.Element {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();

    const handlePress = () => {
        Linking.openURL('https://www.facebook.com/ShyamAshram/');
    };

    const handlePress2 = () => {
        Linking.openURL('https://www.instagram.com/shyam_ashram/');
    };

    return (
        <View style={[style.containerMain, {justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', height: height, }]}> 
            <View style={style.margin}>
                <View style={style.wave}>
                    <Image
                        source={{ uri: LogoUrl }}
                        style={{
                            width: 450,
                            height: 250,
                            resizeMode: 'cover',
                        }}
                        />
                </View>

                <View style={style.container}>
                    <TouchableOpacity
                        style={[style.button2, {height: 80, borderRadius: 40}]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={[style.buttonText, {fontSize: 25}]}>
                            Inicias Sesión
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[style.button2, {height: 80, borderRadius: 40}]}
                        onPress={() => navigation.navigate('Signin')}
                    >
                        <Text style={[style.buttonText, {fontSize: 25}]}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={[
                    style.containerFoot,
                    { marginBottom: insets.bottom + 40, },
                ]}
            >
                <TouchableOpacity
                    style={{ marginRight: 5 }}
                    onPress={handlePress}
                >
                    <Facebook />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginRight: 5 }}
                    onPress={handlePress2}
                >
                    <Instagram />
                </TouchableOpacity>

                <Text style={style.text}>
                    Copyright 2024 | Desarrollado por Andromeda
                </Text>
            </View>
        </View>
    );
}

export default Landing;
