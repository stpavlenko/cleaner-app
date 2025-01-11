import { View, Modal, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import { modalStyles } from '../../../styles/modalStyles';

import Line from '../../graphic/Line';
import UserItem from '../items/UserItem';
import TaskInput from '../inputs/TaskInput';

import { getCleaners } from '../../../http/userAPI';

const ChooseUserModal = ({ modalVisible, setModalVisible, setCleaner, setFio, setUri, value }) => {
    const [searchText, setSearchText] = useState(value);
    const [filteredData, setFilteredData] = useState([]);
    const [usersList, setUsersList] = useState([])

    // Переделать
    useEffect(() => {
        getCleaners().then((response) => {
            setUsersList(response.data)
        }).catch(() => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }, [])

    const handleSearch = (text) => {
        const searchText = text.toLowerCase();
        setSearchText(text);

        const filteredData = usersList.filter((item) => item.fio && item.fio.toLowerCase().includes(searchText));
        setFilteredData(filteredData);
    }

    const select = (id, fio, uri) => {
        setCleaner(id)
        setFio(fio)
        setUri(uri)
        setModalVisible(false)
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
                        <TaskInput
                            placeholder={"Вводите ФИО работника"}
                            value={searchText}
                            onChangeText={handleSearch}
                            header={"Поиск исполнителя"}
                            style={{ paddingBottom: '5%' }}
                        />
                        <FlatList
                            data={filteredData}
                            style={{ marginBottom: 25 }}
                            renderItem={({ item }) =>
                                <>
                                    <TouchableOpacity onPress={() => select(item.id, item.fio, item.photo)}>
                                        <UserItem uri={process.env.EXPO_PUBLIC_API_URL + item.photo} fio={item.fio} />
                                        <Line />
                                    </TouchableOpacity>
                                </>
                            }
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ChooseUserModal