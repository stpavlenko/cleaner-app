import React, { useState } from 'react'
import { ScrollView, View } from 'react-native';
import { observer } from "mobx-react-lite"; // Рендерим прокинутые пропсы, в частности статус задач


import { tabsStyles } from '../../../styles/tabsStyles';

import ManagerTaskWindow from '../windows/ManagerTaskWindow';
import CreateModal from '../modals/CreateModal';
import BlankButton from '../buttons/BlankButton';


const ManagerTasksList = observer(({ list, status }) => {
    const [visible, setVisible] = useState(false)

    const now = new Date()
    const day = String(now.getDate() - 1).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const str = year + '-' + month + '-' + day
    const date = new Date(str)

    return (
        <ScrollView style={tabsStyles.tabComponentContainer} showsVerticalScrollIndicator={false}>
            {list && list.map((obj) =>
            ((status && status == obj.executions[0].status ? (
                <ManagerTaskWindow
                    key={obj.id}
                    status={obj.executions[0].status}
                    name={obj.name}
                    subname={obj.subname}
                    time={obj.time}
                    date={obj.date}
                    place={obj.place}
                    executionId={obj.executions[0].id}
                    fio={obj.executions[0].user.fio}
                    uri={obj.executions[0].user.photo}
                    userId={obj.executions[0].user.id}
                    taskId={obj.id}
                />
            ) : !status && status == obj.executions[0].status && new Date(obj.date) >= date ? (
                <>
                    <ManagerTaskWindow
                        key={obj.id}
                        status={obj.executions[0].status}
                        name={obj.name}
                        subname={obj.subname}
                        time={obj.time}
                        date={obj.date}
                        place={obj.place}
                        executionId={obj.executions[0].id}
                        fio={obj.executions[0].user.fio}
                        uri={obj.executions[0].user.photo}
                        userId={obj.executions[0].user.id}
                        taskId={obj.id}
                    />
                </>
            ) : null)))}
            {!status ? (
                <View style={{marginBottom: '5%'}}>
                    <BlankButton content={"Добавить задачу"} onPress={() => setVisible(!visible)} />
                    <CreateModal modalVisible={visible} setModalVisible={() => setVisible(!visible)} />
                </View>
            ) : null}
        </ScrollView>
    )
})

export default ManagerTasksList