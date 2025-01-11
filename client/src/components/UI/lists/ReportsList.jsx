import { ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { observer } from "mobx-react-lite";

import BlankButton from '../buttons/BlankButton';
import ReportItem from '../items/ReportItem';
import ChooseRangeModal from '../modals/ChooseRangeModal';

import { Context } from '../../../../App';

import { tabsStyles } from '../../../styles/tabsStyles';

import { getReports } from '../../../http/reportsAPI';

const ReportsList = observer(() => {
    const { reports } = useContext(Context)

    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setVisible] = useState(false)

    useEffect(() => {
        getReports().then((response) => {
            console.log(response.data.reports)
            reports.setReports(response.data.reports)
            setIsLoading(false)
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }, [])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <ScrollView style={tabsStyles.tabComponentContainer}>
            {reports.reports && reports.reports.map((obj) =>
                <ReportItem
                    key={obj.id}
                    range={obj.range}
                    objId={obj.id}
                    list={obj.tasks}
                    file={obj.file}
                />
            )}
            <BlankButton content={"Создать отчёт"} onPress={() => setVisible(!isVisible)} />
            <ChooseRangeModal
                modalVisible={isVisible}
                setModalVisible={() => setVisible(!isVisible)}
            />
        </ScrollView>
    )
})

export default ReportsList