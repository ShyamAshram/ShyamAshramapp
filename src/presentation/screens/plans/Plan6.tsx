import React, { useRef, useEffect } from 'react';
import { Text, View, Linking, Image, Animated, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';


const Plan6 = () => {
    const handlePress = () => {
        Linking.openURL('https://drive.google.com/file/d/17MqhZd8pY9pn3_GyyW6Apx9aXKdxHDjH/view');
    };
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={globalStyles.header2}>
                <Text style={styles.title2}>Plan 3 Meses</Text>
            </View>

            <ScrollView style={styles.globalMargin}>
                <View style={styles.cardTop}>
                    <View style={styles.overlay}>
                        <Image style={styles.logo} source={require('../../assets/Logo1.png')} resizeMode="contain" />
                    </View>
                    <View style={styles.cardtextTop}>
                        <Text style={styles.description}>
                            Con el plan de 3 meses, podrás experimentar los beneficios del yoga y la meditación de manera continua, adaptándolo a tu rutina.
                        </Text>
                    </View>
                </View>
                <View style={styles.cardTop}>
                    <View style={styles.cardtextTop}>

                        <SectionTitle title="Beneficios del plan de 3 meses" />
                        <ListItem text="Acceso ilimitado durante 3 meses." />
                        <ListItem text="Opciones de horarios flexibles." />
                        <ListItem text="Clases en grupos reducidos para mejor atención." />
                        <ListItem text="Ideal para quienes buscan un compromiso a corto plazo." />
                    </View>
                </View>
                <View style={styles.cardbottom}>
                    <View style={styles.cardtextPrice}>
                        <Text style={styles.price}>PRECIO</Text>
                        <Text style={styles.price}>$10000</Text>
                    </View>
                </View>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>

                    <TouchableOpacity style={styles.paymentContainer} onPress={handlePress} activeOpacity={0.7}>
                        <Text style={styles.paymentText}>MEDIOS DE PAGO</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};
const SectionTitle = ({ title }: { title: string }) => <Text style={styles.subtitle}>{title}</Text>;
const ListItem = ({ text }: { text: string }) => <Text style={styles.listItem}>• {text}</Text>;

export default Plan6;
