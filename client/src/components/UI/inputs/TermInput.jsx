import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { modalStyles } from '../../../styles/modalStyles';

const TermInput = ({ startTime, setStartTime, finishTime, setFinishTime }) => {
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isFinishDatePickerVisible, setFinishDatePickerVisibility] = useState(false);


    const getHourAndMinute = (str) => {
        const date = new Date(str);
        const time = date.toTimeString().split(' ')[0].split(':')
        return `${time[0]}:${time[1]}`
    }

    return (
        <View style={{ flexDirection: 'column', paddingLeft: '10%' }}>
            <Text style={modalStyles.header}>Время</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[modalStyles.header, { marginTop: '5%' }]}>С</Text>
                <TouchableOpacity style={{ width: '30%' }} onPress={() => setStartDatePickerVisibility(!isStartDatePickerVisible)}>
                    <TextInput
                        style={[modalStyles.input]}
                        textAlignVertical="top"
                        value={startTime}
                        editable={false}
                    />
                </TouchableOpacity>
                <Text style={[modalStyles.header, { marginTop: '5%' }]}>До</Text>
                <TouchableOpacity style={{ width: '30%' }} onPress={() => setFinishDatePickerVisibility(!isFinishDatePickerVisible)}>
                    <TextInput
                        style={[modalStyles.input]}
                        textAlignVertical="top"
                        value={finishTime}
                        editable={false}
                    />
                </TouchableOpacity>
                {/* Пикер начала */}
                <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="time"
                    onConfirm={(value) => setStartTime(getHourAndMinute(value))}
                    onCancel={() => setStartDatePickerVisibility(!isStartDatePickerVisible)}
                // date={new Date()}
                />
                {/* Пикер окончания */}
                <DateTimePickerModal
                    isVisible={isFinishDatePickerVisible}
                    mode="time"
                    onConfirm={(value) => setFinishTime(getHourAndMinute(value))}
                    onCancel={() => setFinishDatePickerVisibility(!isFinishDatePickerVisible)}
                // date={new Date()}
                />
            </View>
        </View>
    )
}

export default TermInput