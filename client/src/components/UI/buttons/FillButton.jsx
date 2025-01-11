import { Text, TouchableOpacity } from 'react-native';
import React from 'react'

import { pagesStyles } from '../../../styles/pagesStyles';

const FillButton = ({ content, onPress, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[pagesStyles.button, { borderRadius: 10, backgroundColor: '#2A7DEE', borderColor: '#2A7DEE' }, style]}>
            <Text
                style={[pagesStyles.buttonText, { color: '#FFFFFF' }]}>
                {content}
            </Text>
        </TouchableOpacity>
    )
}

export default FillButton