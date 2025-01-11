import { Text, View } from 'react-native';
import React from "react";

import { pagesStyles } from '../../../styles/pagesStyles';

const TaskHeaderItem = ({ value }) => {
    return (
        <View style={{ padding: '4%' }}>
            <Text
                style={[pagesStyles.decoration, { color: '#2A7DEE', fontWeight: '400', textAlign: 'left' }]}
            >
                {value}
            </Text>
        </View>
    )
}

export default TaskHeaderItem