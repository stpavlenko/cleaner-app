import { View } from 'react-native';
import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';

import TaskInput from '../inputs/TaskInput';
import CalendarModal from '../modals/CalendarModal';
import TermInput from '../inputs/TermInput';

const ChangeInfoPanel = observer(({
    date,
    setDate,
    street,
    setStreet,
    building,
    setBuilding,
    rc,
    setRc,
    housing,
    setHousing,
    section,
    setSection,
    floor,
    setFloor,
    startTime,
    setStartTime,
    finishTime,
    setFinishTime
}) => {

    const [calendarVisible, setCalendarVisible] = useState(false)

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: '2%' }}>
                <TaskInput header={'Улица'} placeholder={'Улица'} width={'45%'} value={street} onChangeText={setStreet} />
                <TaskInput header={'ЖК'} placeholder={'ЖК'} width={'45%'} value={rc} onChangeText={setRc} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: '2%' }}>
                <TaskInput header={'Дом'} placeholder={'Дом'} width={'20%'} value={building} onChangeText={setBuilding} keyboardType={'numeric'} />
                <TaskInput header={'Корпус'} placeholder={'Корпус'} width={'30%'} value={housing} onChangeText={setHousing} keyboardType={'numeric'} />
                <TaskInput header={'Секция'} placeholder={'Секция'} width={'30%'} value={section} onChangeText={setSection} keyboardType={'numeric'} />
            </View>
            <TaskInput header={'Этаж'} placeholder={'Этаж'} width={'30%'} style={{ paddingVertical: '2%' }} value={floor} onChangeText={setFloor} keyboardType={'numeric'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: '8%', paddingVertical: '2%' }}>
                <TaskInput
                    header={'Дата'}
                    placeholder={'Выбрать'}
                    width={'28%'}
                    onPress={() => setCalendarVisible(!calendarVisible)}
                    editable={false}
                    value={date && date.replace(/-/g, ".")}
                />
                <TermInput startTime={startTime} finishTime={finishTime} setStartTime={setStartTime} setFinishTime={setFinishTime} />
            </View>
            <CalendarModal
                modalVisible={calendarVisible}
                setModalVisible={() => setCalendarVisible(!calendarVisible)}
                date={date}
                setDate={setDate}
                minDate={(new Date())}
                maxDate={null}
            />
        </>
    )
})

export default ChangeInfoPanel