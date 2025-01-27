import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Facebook, Instagram } from "../../icons/Icons";
import { Signin } from "../singin/Singin";
import { Login } from "../login/Login";

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

                    <TouchableOpacity style={style.button2} onPress={() => navigation.navigate('Signin')}>
                        <Text style={style.buttonText}>Sing In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button2} onPress={() => navigation.navigate('Login')}>
                        <Text style={style.buttonText}>Log In</Text>
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

const style = StyleSheet.create({
    containerMain: {
        flex: 1,
        width: '100%',
        height: 'auto',
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    svgcon: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    margin: {
        width: "auto",
        paddingHorizontal: 15,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50,
    },
    wave: {
        width: '200%',
        height: '50%',
        position: 'relative',
    },
    logo: {
        width: 600,
        height: 350,
        alignItems: 'center',
        position: 'relative',
        marginTop: 50,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    input: {
        marginTop: 10,
        position: 'relative',
        width: '60%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button2: {
        marginTop: 20,
        backgroundColor: '#5A215E',
        width: '55%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    containerFoot: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderStartColor: '#00000',
        marginLeft: 150,
        marginBottom: 5,
        width: '100%'

    },
    text: {
        fontSize: 12,
        color: 'black'

    }
});

export default Landing;