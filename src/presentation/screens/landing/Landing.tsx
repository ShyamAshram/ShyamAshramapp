import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Facebook, Instagram } from "../../icons/Icons";
import { style } from "./style";
function Landing(): React.JSX.Element {
    const navigation = useNavigation<any>();
    const handlePress = () => {
        const websiteUrl = 'https://www.facebook.com/ShyamAshram/?paipv=0&eav=AfaZ9aWKsZ4ydXLeH8R74dhWKtHlK5SDqVZsH99Z9ftX7MCfXl6jQAxs6A86x30PYow&_rdr';
        Linking.openURL(websiteUrl);
    };
    const handlePress2 = () => {
        const websiteUrl2 = 'https://www.instagram.com/shyam_ashram/';
        Linking.openURL(websiteUrl2);
    };
    return (
        <View style={style.containerMain} >

            <View style={style.margin}>

                <View style={style.wave}>
                    <Image style={style.logo} source={require('../../assets/Logo1.png')} />
                </View>

                <View style={style.container}>

                    <TouchableOpacity style={style.button2} onPress={() => navigation.navigate('Login')}>
                        <Text style={style.buttonText}>Inicias Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button2} onPress={() => navigation.navigate('Signin')}>
                        <Text style={style.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.containerFoot}>
                    <TouchableOpacity style={{ marginRight: 5 }} onPress={handlePress}>
                        <Facebook />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 5 }} onPress={handlePress2}>
                        <Instagram />
                    </TouchableOpacity>
                    <Text style={style.text}>Copyright 2024 | Desarrollado por Andromeda</Text>
                </View>
            </View>


        </View>
    )

};

export default Landing;