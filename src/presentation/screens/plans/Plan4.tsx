import React, { useRef, useEffect } from 'react';
import { Text, View, Linking, Image, Animated,TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';

const Plan4 = () => {
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
        <SafeAreaView style={globalStyles.mainContainer}>
            <View style={globalStyles.header2}>
                <Text style={styles.title2}>Plan Anualidad</Text>
            </View>

            <ScrollView style={styles.globalMargin}>
                <View style={styles.cardTop}>
                    <View style={styles.overlay}>
                        <Image style={styles.logo} source={require('../../assets/Logo1.png')} resizeMode="contain" />
                    </View>
                    <View style={styles.cardtextTop}>
                        <Text style={styles.description}>
                            ¡Bienvenido al plan de Anualidad! Disfruta de un año completo de práctica continua con acceso ilimitado a todas las clases.
                        </Text>
                    </View>
                </View>
                <View style={styles.cardTop}>
                    <View style={styles.cardtextTop}>

                        <SectionTitle title="Beneficios del plan anual" />
                        <ListItem text="Acceso ilimitado durante 12 meses." />
                        <ListItem text="Horarios flexibles para tu comodidad." />
                        <ListItem text="Instructores altamente calificados." />
                        <ListItem text="Ahorro significativo en comparación con planes cortos." />
                    </View>
                </View>
                <View style={styles.cardbottom}>
                    <View style={styles.cardtextPrice}>
                        <Text style={styles.price}>PAGO EN EFECTIVO</Text>
                        <Text style={styles.price}>$1.850.000</Text>
                    </View>
                </View>
                <View style={styles.cardbottom}>
                    <View style={styles.cardtextPrice}>
                        <Text style={styles.price}>TRANSFERENCIA</Text>
                        <Text style={styles.price}>$1.975.000</Text>
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

// 🔹 Componentes reutilizables
const SectionTitle = ({ title }: { title: string }) => <Text style={styles.subtitle}>{title}</Text>;
const ListItem = ({ text }: { text: string }) => <Text style={styles.listItem}>• {text}</Text>;

export default Plan4;
