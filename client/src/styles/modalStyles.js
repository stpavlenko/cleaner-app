import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
    closeModalButton: {
        color: '#696969',
        fontFamily: 'Assistant-VariableFont_wght',
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'right',
        fontWeight: '400',
        fontStyle: 'normal',
        padding: '3%'
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        margin: '5%',
        borderRadius: 10
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    h1: {
        color: '#2A7DEE',
        fontStyle: 'normal',
        fontWeight: "700",
        fontSize: 20,
        lineHeight: 26,
        textAlign: 'center',
        fontFamily: 'Assistant-VariableFont_wght',
        marginBottom: '2%'
    },
    header: {
        fontFamily: 'Assistant-VariableFont_wght',
        color: '#000000',
        fontStyle: 'normal',
        fontWeight: "400",
        fontSize: 17,
        lineHeight: 22,
        marginBottom: '2%'
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#898989',
        borderRadius: 5,
        fontFamily: 'Assistant-VariableFont_wght',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 20,
        fontStyle: 'normal',
        color: '#414141',
        textAlign: 'left',
        paddingLeft: 8,
        paddingTop: 12,



    },
    buttonModalText: {
        color: '#929292',
        textAlign: 'left',
        lineHeight: 20,
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
        paddingLeft: 10
    },
    buttonModalImage: {
        marginRight: '5%'
    },
    pressable: {
        borderWidth: 0.5,
        borderColor: '#898989',
        borderRadius: 5,
        paddingVertical: '3%'
    }
});