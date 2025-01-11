import React from 'react'
import { ScrollView } from 'react-native';
import { observer } from "mobx-react-lite"; // Рендерим прокинутые пропсы, в частности статус задач

import { tabsStyles } from '../../../styles/tabsStyles';
import CleanerTaskWindow from '../windows/CleanerTaskWindow';

const CleanerTasksList = observer(({ list, status }) => {

    const now = new Date()
    const day = String(now.getDate() - 1).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const str = year + '-' + month + '-' + day
    const date = new Date(str)

    return (
        <ScrollView style={tabsStyles.tabComponentContainer} showsVerticalScrollIndicator={false}>
            {list && list.map((obj) =>
            ((status && status == obj.status ? (
                <CleanerTaskWindow
                    key={obj.id}
                    id={obj.id}
                    status={obj.status}
                    name={obj.task.name}
                    subname={obj.task.subname}
                    time={obj.task.time}
                    place={obj.task.place}
                    date={obj.task.date}
                />
            ) : !status && status == obj.status && new Date(obj.task.date) >= date ? (
                <CleanerTaskWindow
                    key={obj.id}
                    id={obj.id}
                    status={obj.status}
                    name={obj.task.name}
                    subname={obj.task.subname}
                    time={obj.task.time}
                    place={obj.task.place}
                    date={obj.task.date}
                />
            ) : null))
            )}
        </ScrollView>
    )
})

export default CleanerTasksList