import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const{width, height} = Dimensions.get('window');

export const style = StyleSheet.create({
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
        width: width,
        paddingHorizontal: 15,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50,
    },
    wave: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.4,
        position: 'relative',
    },
    logo: {
        width: width,
        height: height * 0.4,
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
        flex: 1,
        borderWidth: 0,
        width:width * 0.9,
        height: height * 0.09,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    containerFoot: {
        borderWidth: 0,
        
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