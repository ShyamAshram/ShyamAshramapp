import { StyleSheet } from 'react-native';

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
        fontSize: 20,
        fontFamily:'Quicksand-Bold'
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