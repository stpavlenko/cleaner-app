import { Text, View, Modal, Alert } from 'react-native';
import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { runInAction } from "mobx"

import { Context } from '../../../../App';

import { tasksStyles } from '../../../styles/tasksStyles';
import { pagesStyles } from '../../../styles/pagesStyles';
import { modalStyles } from '../../../styles/modalStyles';
import { tabsStyles } from '../../../styles/tabsStyles';

import Line from '../../graphic/Line'
import TaskHeaderItem from '../items/TaskHeaderItem';
import TaskInfoItem from '../items/TaskInfoItem';
import UserItem from '../items/UserItem';
import BlankButton from '../buttons/BlankButton';
import LittleImageSlider from '../sliders/LittleImageSlider';

import { executeTask } from '../../../http/tasksAPI';

const ExecuteModal = ({ modalVisible, setModalVisible, name, subname, time, place, date, fio, uri, id }) => {
    const { tasks } = useContext(Context)
    const [images, setImages] = useState([])

    const selectImages = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Требуется резрешение на досуп к медиа!');
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult.assets[0].uri);

        if (!pickerResult.canceled) {
            // Обновляем локальное состояние и посылаем запрос на сервер
            setImages(array => [...array, pickerResult.assets[0].uri])
        }
    };

    const execute = () => {
        if (images.length < 2) {
            return Alert.alert("Внимание", "Необходимо приложить от 3 до 5 фотографий.", [{ text: "OK" }])
        }
        const formData = new FormData()
        formData.append('id', id)
        formData.append('status', true)
        images.map((image, index) => {
            formData.append(`${index}`, {
                uri: image,
                name: `${index}.jpg`,
                type: 'image/jpg',
            })
        })
        executeTask(formData).then(() => {
            setImages([])
            setModalVisible(false)
            let execution = tasks.tasks.find((obj) => obj.id === id)
            runInAction(() => {
                execution.status = true
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
                    <Text style={modalStyles.closeModalButton} onPress={() => setModalVisible(false)}>
                        Закрыть
                    </Text>
                    <Line />
                    <TaskHeaderItem value={name} />
                    <Line />
                    <TaskHeaderItem value={subname} />
                    <Line />
                    <TaskInfoItem date={date} time={time} place={place} />
                    <Line />
                    <UserItem uri={uri} fio={fio} />
                    <Line />
                    <View style={{ padding: '4%' }}>
                        <Text style={[pagesStyles.h2, { textAlign: 'left' }]}>Если вы выполнили задачу</Text>
                        <Text style={[pagesStyles.decoration, { textAlign: 'left', paddingBottom: '5%' }]}>Прикрепите фото {`(не менее 3х)`}</Text>
                        <LittleImageSlider images={images} max={5} addImage={selectImages} />
                        <Text style={[pagesStyles.decoration, { textAlign: 'left', paddingVertical: '5%', }]}>Дата и время выполнения задачи</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: '10%' }}>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={[tasksStyles.statusText, { color: '#000000' }]}>Дата</Text>
                                <Text style={tabsStyles.infoText}>{date.replace(/-/g, ".")}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[tasksStyles.statusText, { color: '#000000' }]}>Время</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[tasksStyles.statusText, { color: '#000000' }]}>С  </Text>
                                    <Text style={tabsStyles.infoText}>{time[0]}</Text>
                                    <Text style={[tasksStyles.statusText, { color: '#000000' }]}>  До  </Text>
                                    <Text style={tabsStyles.infoText}>{time[1]}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Line />
                    <BlankButton content={"Задача выполнена"} onPress={() => execute()} />
                </View>
            </View>
        </Modal >
    )
}


export default ExecuteModal