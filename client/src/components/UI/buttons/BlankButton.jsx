import { Text, TouchableOpacity } from 'react-native';
import React  from 'react'

import { pagesStyles } from '../../../styles/pagesStyles';

const BlankButton = ({content, onPress, style}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[pagesStyles.button, { borderRadius: 10, borderColor: '#2A7DEE' }, style]}>
            <Text
                style={[pagesStyles.buttonText]}>
                {content}
            </Text>
        </TouchableOpacity>
    )
}

export default BlankButton