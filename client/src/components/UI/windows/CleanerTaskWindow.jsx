import { StyleSheet, View, Alert } from 'react-native';
import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import { Context } from '../../../../App'

import ExecuteModal from '../modals/ExecuteModal';
import TimedButton from '../buttons/TimedButton';
import Line from '../../graphic/Line'
import UserItem from '../items/UserItem';
import StatusItem from '../items/StatusItem'
import TaskHeaderItem from '../items/TaskHeaderItem';
import TaskInfoItem from '../items/TaskInfoItem';

import { download } from '../../../http/tasksAPI';

const CleanerTaskWindow = observer(({ status, name, subname, time, place, date, id }) => {
    const [visible, setVisible] = useState(false)

    const { user } = useContext(Context)


    const downloadFile = () => {
        download(id, user.user.id).then(async (response) => {
            const localUri = `${FileSystem.documentDirectory}` + `${response.data.file}`;
            const fileUri = `${process.env.EXPO_PUBLIC_API_URL}` + `${response.data.file}`;
            const downloadResult = await FileSystem.downloadAsync(fileUri, localUri)
            if (downloadResult.status === 200) {
                const mimeType = 'application/pdf';
                IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: fileUri,
                    flags: 1,
                    type: mimeType,
                });
            } else {
                Alert.alert("Внимание", "Ошибка скачивания файла.", [{ text: "OK" }])
            }
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

    return (
        <View style={styles.container}>
            <TaskHeaderItem value={name} />
            <Line />
            <TaskHeaderItem value={subname} />
            <Line />
            <TaskInfoItem date={date} time={time} place={place} />
            {!status ? (
                <TimedButton date={date} start={time[0]} finish={time[1]} showModal={() => setVisible(!visible)} />
            ) : (
                <>
                    <Line />
                    <UserItem uri={process.env.EXPO_PUBLIC_API_URL + user.user.photo} fio={user.user.fio} />
                    <Line />
                    <StatusItem onPress={() => downloadFile()} />
                </>
            )}
            <ExecuteModal
                modalVisible={visible}
                setModalVisible={() => setVisible(false)}
                name={name}
                subname={subname}
                time={time}
                place={place}
                date={date}
                fio={user.user.fio}
                uri={process.env.EXPO_PUBLIC_API_URL + user.user.photo}
                id={id}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: '8%',
        borderColor: '#A6A6A6',
    },
})

export default CleanerTaskWindow