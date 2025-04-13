import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Add2 } from '../../icons/Icons';

interface Props {
    onPress: () => void;
}

const FloatingActionButton: React.FC<Props> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Add2 />
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
