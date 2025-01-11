import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react'

const ExitButton = ({ onPress }) => {

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
            <Image source={require('../../../../assets/Exit.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '20%',
        alignItems: 'flex-end'
    }
})

export default ExitButton