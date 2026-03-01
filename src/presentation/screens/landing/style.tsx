import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const{width, height} = Dimensions.get('window');

export const style = StyleSheet.create({
    containerMain: {
        flex: 1,
        width: '100%',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    svgcon: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    margin: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wave: {
        marginTop:60,
        overflow: 'hidden',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    },
    logo: {
        width: width * 0.7,
        height: height * 0.4,
        alignItems: 'center',
        position: 'relative',
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
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily:'Quicksand-Bold'
    },
    container: {
        width:width * 0.9,
        height: height * 0.3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    containerFoot: {
        
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderStartColor: '#00000',
        marginBottom: 5,
        width: '100%'

    },
    text: {
        fontSize: 9,
        color: 'black'

    }
});