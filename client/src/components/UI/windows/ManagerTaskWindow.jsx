import { StyleSheet, View, Alert } from 'react-native';
import React, { useState, useContext } from "react";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { runInAction } from "mobx"
import { observer } from 'mobx-react-lite';

import { Context } from '../../../../App';

import EditingModal from '../modals/EditingModal';
import TaskHeaderItem from '../items/TaskHeaderItem';
import Line from '../../graphic/Line';
import TaskInfoItem from '../items/TaskInfoItem';
import UserItem from '../items/UserItem';
import StatusItem from '../items/StatusItem';
import SettingsButton from '../buttons/SettingsButton';
import ButtonsPanel from '../panels/ButtonsPanel';

import { download, updateTask } from '../../../http/tasksAPI';

const ManagerTaskWindow = observer(({ status, name, subname, time, place, date, executionId, uri, fio, userId, taskId }) => {

    const [isVisible, setIsVisible] = useState(false)

    const { tasks } = useContext(Context)

    const downloadFile = () => {
        download(executionId, userId).then(async (response) => {
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

    const checkTask = (bool) => {
        updateTask(taskId, executionId, name, subname, bool, date, time, place, userId).then((response) => {
            const obj = tasks.tasks.filter(obj => obj.id === taskId)
            runInAction(() => {
                obj[0].executions[0].status = response.data.execution.status
            })
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TaskHeaderItem value={name} />
                <SettingsButton onPress={() => setIsVisible(!isVisible)} />
            </View>
            <Line />
            <TaskHeaderItem value={subname} />
            <Line />
            <TaskInfoItem date={date} time={time} place={place} />
            <Line />
            <UserItem uri={process.env.EXPO_PUBLIC_API_URL + uri} fio={fio} />
            <Line />
            {!status ? (
                <ButtonsPanel onConfirm={() => checkTask(true)} onRefuse={() => checkTask(false)} status={status} />
            ) : (
                <StatusItem onPress={() => downloadFile()} />
            )}
            <EditingModal
                modalVisible={isVisible}
                setModalVisible={() => setIsVisible(false)}
                status={status}
                uri={uri}
                fio={fio}
                name={name}
                subname={subname}
                time={time}
                date={date}
                place={place}
                taskId={taskId}
                executionId={executionId}
                userId={userId}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '8%',
        borderColor: '#A6A6A6',
    },
})

export default ManagerTaskWindow