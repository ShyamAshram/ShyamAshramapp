import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Add2, Calendario } from '../../icons/Icons';

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
        right: 20,
        bottom: 60,
        backgroundColor: '#5A215E',
        width: 40,
        height: 40,
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
