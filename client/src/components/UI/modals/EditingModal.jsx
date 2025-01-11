import { View, TouchableOpacity, Modal, Text, Alert } from 'react-native';
import React, { useState, useContext } from "react";
import { observer } from 'mobx-react-lite';
import { runInAction } from "mobx"

import { updateTask, deleteTask } from '../../../http/tasksAPI';

import { Context } from '../../../../App';

import { modalStyles } from '../../../styles/modalStyles';
import { pagesStyles } from '../../../styles/pagesStyles';

import Line from '../../graphic/Line';
import ButtonsPanel from '../panels/ButtonsPanel';
import UserItem from '../items/UserItem';
import TaskHeaderInput from '../inputs/TaskHeaderInput';
import TaskInfoItem from '../items/TaskInfoItem';
import ChangeInfoModal from './ChangeInfoModal';
import ChooseUserModal from './ChooseUserModal';

const EditingModal = observer(({
    modalVisible,
    setModalVisible,
    uri,
    fio,
    name,
    subname,
    status,
    time,
    date,
    place,
    taskId,
    executionId,
    userId
}) => {
    const { tasks } = useContext(Context)

    const [nameField, setNameField] = useState(name)
    const [subnameField, setSubnameField] = useState(subname)
    const [completed, setCompleted] = useState(status)
    // Дата
    const [dateField, setDateField] = useState(date)
    // Место
    const [street, setStreet] = useState(place[0])
    const [building, setBuilding] = useState(place[1])
    const [rc, setRc] = useState(place[2])
    const [housing, setHousing] = useState(place[3])
    const [section, setSection] = useState(place[4])
    const [floor, setFloor] = useState(place[5])
    // Время
    const [startTime, setStartTime] = useState(time[0])
    const [finishTime, setFinishTime] = useState(time[1])
    // Исполнитель
    const [cleaner, setCleaner] = useState(userId)
    const [fioField, setFioField] = useState(fio)
    const [uriField, setUriField] = useState(uri)


    const [modalInfoVisible, setModalInfoVisible] = useState(false)
    const [userModalVisible, setUserModalVisible] = useState(false)

    // Проверяем, что время старта меньше времени окончания
    const checkTime = () => {
        let time1 = new Date()
        let time2 = new Date()

        let startArr = startTime.split(':')
        let finishArr = finishTime.split(':')

        time1.setHours(startArr[0], startArr[1], 0)
        time2.setHours(finishArr[0], finishArr[1], 0)
        if (time1 < time2) {
            // console.log(true)
            return true
        } else {
            // console.log(false)
            return false
        }
    }

    const saveTask = () => {
        if (!checkTime() || !nameField || !subnameField || !street || !building) {
            return Alert.alert("Внимание", "Некорретно указано время.", [{ text: "OK" }])
        }
        updateTask(
            taskId,
            executionId,
            nameField,
            subnameField,
            completed,
            dateField,
            [startTime, finishTime],
            [street, building, rc, housing, section, floor],
            cleaner
        ).then((response) => {
            let obj = tasks.tasks.find(obj => obj.executions[0].id == executionId)
            runInAction(() => {
                obj.name = response.data.task.name
                obj.subname = response.data.task.subname
                obj.date = response.data.task.date
                obj.place[0] = response.data.task.place[0]
                obj.place[1] = response.data.task.place[1]
                obj.place[2] = response.data.task.place[2]
                obj.place[3] = response.data.task.place[3]
                obj.place[4] = response.data.task.place[4]
                obj.place[5] = response.data.task.place[5]
                obj.time[0] = response.data.task.time[0]
                obj.time[1] = response.data.task.time[1]
                obj.executions[0].status = response.data.execution.status
                obj.executions[0].userId = response.data.execution.userId
                obj.executions[0].user.fio = fioField
                obj.executions[0].user.photo = uriField
                // obj.executions[0].user.tel = response.data.execution.user.tel
                // obj.executions[0].user.email = response.data.execution.user.email
            })
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        }).finally(() => {
            setModalVisible(false)
        })
    }

    const del = () => {
        deleteTask(taskId).then(() => {
            tasks.removeTask(taskId)
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        }).finally(() => {
            setModalVisible(false)
        })
    }

    return (
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
            >
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.modalContainer}>
                        <View style={{ padding: '5%' }}>
                            <TouchableOpacity>
                                <Text style={modalStyles.closeModalButton} onPress={() => setModalVisible(false)}>
                                    Закрыть
                                </Text>
                            </TouchableOpacity>
                            <Line />
                            <TaskHeaderInput value={nameField} setValue={(value) => setNameField(value)} />
                            <Line />
                            <TaskHeaderInput value={subnameField} setValue={(value) => setSubnameField(value)} />
                            <Line />
                            <TouchableOpacity onPress={() => setModalInfoVisible(true)}>
                                <TaskInfoItem
                                    time={[startTime, finishTime]}
                                    date={dateField}
                                    place={[street, building, rc, housing, section, floor]} />
                            </TouchableOpacity>
                            <Line />
                            <TouchableOpacity onPress={() => setUserModalVisible(!userModalVisible)}>
                                <UserItem uri={process.env.EXPO_PUBLIC_API_URL + uriField} fio={fioField} />
                            </TouchableOpacity>
                            <Line />
                            <ButtonsPanel status={completed} onConfirm={() => setCompleted(true)} onRefuse={() => setCompleted(false)} />
                            <Line />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: '5%' }}>
                                <TouchableOpacity onPress={saveTask}>
                                    <Text style={[pagesStyles.decoration, { color: '#2A7DEE', paddingHorizontal: '9%', fontSize: 17, lineHeight: 22 }]}>
                                        Сохранить
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={del}>
                                    <Text style={[pagesStyles.decoration, { textDecorationLine: 'underline', color: '#FF6262', paddingHorizontal: '7%', fontSize: 17, lineHeight: 22 }]}>
                                        Удалить задачу
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <ChangeInfoModal
                modalVisible={modalInfoVisible}
                setModalVisible={() => setModalInfoVisible(!modalInfoVisible)}
                setDate={setDateField}
                date={dateField}
                street={street}
                setStreet={setStreet}
                building={building}
                setBuilding={setBuilding}
                rc={rc}
                setRc={setRc}
                housing={housing}
                setHousing={setHousing}
                section={section}
                setSection={setSection}
                floor={floor}
                setFloor={setFloor}
                startTime={startTime}
                setStartTime={setStartTime}
                finishTime={finishTime}
                setFinishTime={setFinishTime}
            />
            <ChooseUserModal
                modalVisible={userModalVisible}
                setModalVisible={() => setUserModalVisible(!userModalVisible)}
                setCleaner={setCleaner}
                setFio={setFioField}
                setUri={setUriField}
                value={fioField}
            />
        </>
    )
})

export default EditingModal