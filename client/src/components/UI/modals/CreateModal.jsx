import { Text, View, Modal, ScrollView, Alert } from 'react-native';
import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { runInAction } from "mobx"

import { modalStyles } from '../../../styles/modalStyles';

import { Context } from '../../../../App';

import TaskInput from '../inputs/TaskInput';
import ChangeInfoPanel from '../panels/ChangeInfoPanel';
import BlankButton from '../buttons/BlankButton';
import ChooseUserModal from './ChooseUserModal';

import { createTask } from '../../../http/tasksAPI';

const CreateModal = observer(({ modalVisible, setModalVisible }) => {
    const { tasks } = useContext(Context)

    const [nameField, setNameField] = useState(null)
    const [subnameField, setSubnameField] = useState(null)

    const [street, setStreet] = useState(null)
    const [building, setBuilding] = useState(null)
    const [rc, setRc] = useState(null)
    const [housing, setHousing] = useState(null)
    const [section, setSection] = useState(null)
    const [floor, setFloor] = useState(null)

    const [cleaner, setCleaner] = useState(null)
    const [fioField, setFioField] = useState(null)
    const [uriField, setUriField] = useState(null)

    const [date, setDate] = useState(null);

    const [startTime, setStartTime] = useState(null)
    const [finishTime, setFinishTime] = useState(null)

    const [listVisible, setListVisible] = useState(false)

    const send = () => {
        if (!nameField || !subnameField || !street || !building || !cleaner || !date || !startTime || !finishTime) {
            return Alert.alert("Внимание", "Не все поля заполнены.", [{ text: "OK" }])
        }
        createTask(
            nameField,
            subnameField,
            [street, building, rc, housing, section, floor],
            date,
            [startTime, finishTime],
            cleaner
        ).then((response) => {
            // console.log(response.data)
            runInAction(() => {
                tasks.setTasks(...tasks.tasks.push(response.data))
            })
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        }).finally(() => {
            setNameField(null)
            setSubnameField(null)
            setStreet(null)
            setBuilding(null)
            setRc(null)
            setHousing(null)
            setSection(null)
            setFloor(null)
            setCleaner(null)
            setFioField(null)
            setUriField(null)
            setDate(null)
            setStartTime(null)
            setFinishTime(null)
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
                <ScrollView style={modalStyles.overlay}>
                    <View style={modalStyles.modalContainer}>
                        <View style={{ padding: '5%' }}>
                            <Text style={modalStyles.closeModalButton} onPress={setModalVisible}>
                                Закрыть
                            </Text>
                            <Text style={modalStyles.h1}>Новая задача</Text>
                            <TaskInput
                                header={"Название задачи"}
                                placeholder={"Введите название задачи"}
                                style={{ paddingVertical: '2%' }}
                                value={nameField}
                                onChangeText={setNameField} />
                            <TaskInput
                                header={"Название подзадачи"}
                                placeholder={"Введите название подзадачи"}
                                style={{ paddingVertical: '2%' }}
                                value={subnameField}
                                onChangeText={setSubnameField} />
                            <ChangeInfoPanel
                                setDate={setDate}
                                date={date}
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
                            <TaskInput
                                header={"Назначить ответственного клинера"}
                                placeholder={"Выбрать"}
                                style={{ paddingVertical: '2%' }}
                                editable={false}
                                onPress={() => setListVisible(!listVisible)}
                                value={fioField}
                            />
                            <BlankButton
                                content={"Добавить задачу"}
                                onPress={send} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <ChooseUserModal
                modalVisible={listVisible}
                setModalVisible={() => setListVisible(!listVisible)}
                setFio={setFioField}
                setUri={setUriField}
                setCleaner={setCleaner}
            />
        </>
    )
})

export default CreateModal