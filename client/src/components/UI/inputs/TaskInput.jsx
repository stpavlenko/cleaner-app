import { TextInput, Text, TouchableOpacity } from 'react-native';

import { modalStyles } from '../../../styles/modalStyles';

const TaskInput = ({ header, placeholder, width, style, onPress, editable, value, onChangeText, keyboardType }) => {
    return (
        <TouchableOpacity style={[{ width: width }, style]} onPress={onPress}>
            <Text style={[modalStyles.header]}>{header}</Text>
            <TextInput
                style={[modalStyles.input]}
                placeholder={placeholder}
                placeholderTextColor='#707070'
                textAlignVertical="top"
                editable={editable}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </TouchableOpacity>
    )
}

export default TaskInput