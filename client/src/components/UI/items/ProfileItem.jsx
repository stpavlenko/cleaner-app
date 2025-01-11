import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';


const ProfileItem = ({ label, value, onValueChange, onSubmitEditing }) => {

    return (
        <>
            <Text style={styles.headerInfo}>
                {label}
            </Text>
            <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                activeOpacity={0.8}
            >
                <TextInput
                    style={styles.info}
                    onChangeText={(value) => onValueChange(value)}
                    onSubmitEditing={onSubmitEditing}
                    placeholderTextColor={'#2A7DEE'}
                    placeholder='Указать'
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    >
                    {value}
                </TextInput>
            </TouchableOpacity>

        </>

    )
}

const styles = StyleSheet.create({
    info: {
        color: '#4F4F4F',
        textAlign: 'left',
        lineHeight: 26,
        fontSize: 20,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
        marginBottom: '3%',
        borderBottomWidth: 0
    },
    headerInfo: {
        color: '#000000',
        textAlign: 'left',
        lineHeight: 24,
        fontSize: 18,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
    },
})

export default ProfileItem