import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { pagesStyles } from '../../../styles/pagesStyles';

import Line from '../../graphic/Line';

const TimedButton = ({ date, start, finish, showModal }) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Функция для проверки текущей даты и времени
        const checkDateTime = () => {
            const currentDate = new Date();
            const startTime = new Date(date + 'T' + start); // Замените на нужное время начала
            const endTime = new Date(date + 'T' + finish); // Замените на нужное время окончания

            if (currentDate >= startTime && currentDate <= endTime) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        checkDateTime();

        const interval = setInterval(checkDateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            {showButton &&
                <>
                    <Line />
                    <TouchableOpacity
                        style={[pagesStyles.button, { borderRadius: 10, backgroundColor: '#2A7DEE', borderColor: '#2A7DEE', textAlign: 'left', margin: '5%' }]}
                        activeOpacity={0.5}
                        onPress={() => showModal()}
                    >
                        <Text
                            style={[pagesStyles.buttonText, { color: '#FFFFFF' }]}
                        >
                            Начать выполнение
                        </Text>
                    </TouchableOpacity>
                </>
            }
        </View>

    );
};

export default TimedButton