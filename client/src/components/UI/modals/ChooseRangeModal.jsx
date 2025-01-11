import { View, Modal, Text, Alert } from 'react-native';
import React, { useState, useContext } from "react";

import { modalStyles } from '../../../styles/modalStyles';

import { Context } from '../../../../App';

import TaskInput from '../inputs/TaskInput';
import CalendarModal from './CalendarModal';
import FillButton from '../buttons/FillButton';

import { createReport, getReports } from '../../../http/reportsAPI';

const ChooseRangeModal = ({ modalVisible, setModalVisible }) => {

    const { reports } = useContext(Context)

    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    const [fromModalVisible, setFromModalVisible] = useState(false)
    const [toModalVisible, setToModalVisible] = useState(false)

    let today = new Date()

    const generate = () => {
        if (!from || !to) {
            return Alert.alert("Внимание", "Не все поля заполнены.", [{ text: "OK" }])
        }
        if (from > to) {
            return Alert.alert("Внимание", "Некорректный выбор дат.", [{ text: "OK" }])
        }
        createReport(from, to).then(() => {
            getReports().then((response) => {
                reports.setReports(response.data.reports)
            }).catch((error) => {
                Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
            })
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: '2%' }}>
                            <TaskInput
                                header={'С'}
                                placeholder={'Выбрать'}
                                width={'45%'}
                                value={from && from.replace(/-/g, ".")}
                                editable={false}
                                onPress={() => setFromModalVisible(!fromModalVisible)}
                            />
                            <TaskInput
                                header={'До'}
                                placeholder={'Выбрать'}
                                width={'45%'}
                                value={to && to.replace(/-/g, ".")}
                                editable={false}
                                onPress={() => setToModalVisible(!toModalVisible)}
                            />
                        </View>
                        <FillButton content={"Построить отчёт"} onPress={generate} />
                    </View>
                </View>
                <CalendarModal
                    modalVisible={fromModalVisible}
                    setModalVisible={() => setFromModalVisible(!fromModalVisible)}
                    date={from}
                    setDate={setFrom}
                    minDate={null}
                    maxDate={today.setDate(today.getDate() - 1)}
                />
                <CalendarModal
                    modalVisible={toModalVisible}
                    setModalVisible={() => setToModalVisible(!toModalVisible)}
                    date={to}
                    setDate={setTo}
                    minDate={null}
                    maxDate={today.setDate(today.getDate() - 1)}
                />
            </View>
        </Modal>
    )
}

export default ChooseRangeModal