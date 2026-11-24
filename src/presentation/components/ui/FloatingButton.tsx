import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Add2, Calendario } from '../../icons/Icons';

const isIos = Platform.OS === 'ios';

interface Props {
    onPress: () => void;
    top?: any;
    bg?:any;
}

const FloatingActionButton: React.FC<Props> = ({ onPress, top, bg }) => {

    return (
        <TouchableOpacity style={[styles.fab, {bottom: top ? top :140, backgroundColor: bg ? bg : '#5A215E' }]} onPress={onPress}>
            {!bg ? ( 
            <Add2 />
            ) : (
            <Calendario color='#FFF'/>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: isIos ? 10 : 20,
        bottom: isIos ? 40 : 60,
        backgroundColor: '#5A215E',
        width: isIos ? 60 : 40,
        height: isIos ? 60 : 40,
        marginTop: 10,
        marginBottom: 10,
        gap: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
    },
});

export default FloatingActionButton;
