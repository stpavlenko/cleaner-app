import { View, Modal, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { modalStyles } from '../../../styles/modalStyles';

const CalendarModal = ({ modalVisible, setModalVisible, date, setDate, minDate, maxDate }) => {

    LocaleConfig.locales['ru'] = {
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        today: 'Сегодня',
    };
    LocaleConfig.defaultLocale = 'ru';

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalStyles.overlay}>
                <View style={modalStyles.modalContainer}>
                    <View style={{ padding: '5%' }}>
                        <Text style={modalStyles.closeModalButton} onPress={setModalVisible}>
                            Закрыть
                        </Text>
                        <Calendar
                            onDayPress={day => {
                                setDate(day.dateString);
                                // console.log(day.dateString);
                                setTimeout(() => {
                                    setModalVisible(false)
                                }, 300)
                            }}
                            markedDates={{
                                [date]: { date: true, disableTouchEvent: true, selected: true }
                            }}
                            style={{
                                marginBottom: '5%'
                            }}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default CalendarModal