import React, { useEffect, useRef } from 'react';
import { Text, View, Linking, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.svg';


const Plan5 = () => {
    const insets = useSafeAreaInsets();
    
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
        <View style={globalStyles.mainContainer}>
            <View style={[globalStyles.header2, { paddingTop: insets.top }]}>
                <Text maxFontSizeMultiplier={1} style={styles.title2}>Plan 6 Meses</Text>
            </View>

            <ScrollView style={styles.globalMargin}  contentContainerStyle={styles.scrollContent}>
                <View style={styles.cardTop}>
                    <View style={styles.overlay}>
                        <Logo width={200} height={40}/>
                    </View>
                    <View style={styles.cardtextTop}>
                        <Text maxFontSizeMultiplier={1} style={styles.description}>
                            Con el plan de 6 meses, tendrás acceso a todas nuestras clases y actividades para fortalecer tu bienestar y crecimiento personal.
                        </Text>
                    </View>
                </View>
                <View style={styles.cardTop}>
                    <View style={styles.cardtextTop}>
                        <SectionTitle title="Beneficios del plan de 6 meses" />
                        <ListItem text="Acceso ilimitado durante medio año." />
                        <ListItem text="Flexibilidad para asistir en cualquier horario." />
                        <ListItem text="Clases impartidas por expertos." />
                        <ListItem text="Precio especial con descuento a largo plazo." />
                    </View>
                </View>
                <View style={styles.cardbottom}>
                    <View style={styles.cardtextPrice}>
                        <Text maxFontSizeMultiplier={1} style={styles.price}>PAGO EN EFECTIVO</Text>
                        <Text maxFontSizeMultiplier={1} style={styles.price}>$925.000</Text>
                    </View>
                </View>
                <View style={styles.cardbottom}>
                    <View style={styles.cardtextPrice}>
                        <Text maxFontSizeMultiplier={1} style={styles.price}>TRANSFERENCIA</Text>
                        <Text maxFontSizeMultiplier={1} style={styles.price}>$987.500</Text>
                    </View>
                </View>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity style={styles.paymentContainer} onPress={handlePress} activeOpacity={0.7}>
                        <Text maxFontSizeMultiplier={1} style={styles.paymentText}>MEDIOS DE PAGO</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </View>
    );
};
const SectionTitle = ({ title }: { title: string }) => <Text maxFontSizeMultiplier={1} style={styles.subtitle}>{title}</Text>;
const ListItem = ({ text }: { text: string }) => <Text maxFontSizeMultiplier={1} style={styles.listItem}>• {text}</Text>;

export default Plan5;
