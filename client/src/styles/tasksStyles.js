import { StyleSheet } from 'react-native';

export const tasksStyles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '8%',
        borderColor: '#A6A6A6'
    },
    text: {
        fontFamily: 'Assistant-VariableFont_wght',
        fontSize: 13,
        lineHeight: 17,
        textAlign: 'left',
        paddingTop: '3%',
        paddingLeft: '5%',
    },
    image: {
        position: 'relative',
        left: '85%',
        bottom: '85%'
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#A6A6A6',
    },
    icon: {
        position: 'relative',
        left: '70%',
        bottom: '12%'
    },
    statusText: {
        fontFamily: 'Assistant-VariableFont_wght',
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'left',
        fontWeight: '400',
        fontStyle: 'normal',
        paddingTop: '1%'
    },
    buttonText: {
        color: '#2A7DEE',
        textAlign: 'center',
        lineHeight: 17,
        fontSize: 13,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
    }
});