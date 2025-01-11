import { Text, View } from 'react-native';
import React from "react";

import { pagesStyles } from '../../../styles/pagesStyles';

import { MONTHS, SHORT_DAYS_OF_WEEK } from '../../../utils/consts';

const TaskInfoItem = ({ date, time, place }) => {

    const d = new Date(date)
    const dayOfWeek = SHORT_DAYS_OF_WEEK[d.getDay()];
    const month = MONTHS[d.getMonth()];
    const day = d.getDate();

    return (
        <View style={{ padding: '4%' }}>
            <Text
                style={[pagesStyles.decoration, { fontWeight: '700', color: '#000000', textAlign: 'left', }]}
            >
                {day} {month}, {dayOfWeek}
            </Text>
            <Text
                style={[pagesStyles.decoration, { fontWeight: '600', color: '#000000', textAlign: 'left', }]}
            >
                {time[0]}-{time[1]}
            </Text>
            {place[0] ? (
                <Text
                    style={[pagesStyles.decoration, { fontWeight: '700', color: '#000000', textAlign: 'left', }]}
                >
                    ул. {place[0]} {place[1]}

                </Text>
            ) : null}
            {place[2] ? (
                <Text
                    style={[pagesStyles.decoration, { fontWeight: '700', color: '#000000', textAlign: 'left', paddingVertical: '1%'}]}
                >
                    ЖК {place[2]}

                </Text>
            ) : null}
            {place[3] || place[4] || place[5] ? (
                <Text
                    style={[pagesStyles.decoration, { fontWeight: '600', color: '#000000', textAlign: 'left', }]}
                >
                    {place[3] && `${place[3]}й корпус,`}{place[4] && `${place[4]} секция,`} {place[5] && `${place[5]} этаж`}
                </Text>
            ) : null}
        </View>
    )
}

export default TaskInfoItem