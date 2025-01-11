import { Text, View, Modal, TouchableOpacity } from 'react-native';
import PieChart from 'react-native-pie-chart'
import React, { useState, useEffect } from 'react'

import { modalStyles } from '../../../styles/modalStyles';
import { pagesStyles } from '../../../styles/pagesStyles';

import Line from '../../graphic/Line';

const ReportModal = ({ modalVisible, setModalVisible, objId, range, list, file }) => {
    const widthAndHeight = 250
    const series = [2, 1]
    const sliceColor = ['rgba(0, 174, 194, 1)', 'rgba(64, 134, 244, 1)']

    const [completedList, setCompletedList] = useState([])
    const [failedList, setFailedList] = useState([])

    useEffect(() => {
        setCompletedList(list.filter(obj => obj.executions[0].status == true))
        setFailedList(list.filter(obj => obj.executions[0].status == false))
        // console.log(completedList)
        // console.log(failedList)
    }, [])

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalStyles.overlay}>
                <View style={modalStyles.modalContainer}>
                    <Text style={[modalStyles.closeModalButton, { paddingTop: '8%', paddingRight: '8%' }]} onPress={() => setModalVisible(false)}>
                        Закрыть
                    </Text>
                    <View style={{ paddingHorizontal: '4%', paddingBottom: '5%' }}>
                        <Text
                            style={[pagesStyles.h1, { color: '#000000', fontWeight: '400', textAlign: 'left', paddingBottom: '5%' }]}
                        >
                            Отчет {range[0].replace(/-/g, ".")} - {range[1].replace(/-/g, ".")}
                        </Text>
                        <Line />
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[pagesStyles.h1, { color: 'rgba(42, 125, 238, 1)', fontWeight: '500', paddingVertical: '10%', lineHeight: 24 }]}>Выполнение задач</Text>
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={series}
                                sliceColor={sliceColor}
                                coverRadius={0.45}
                                coverFill={'#FFF'}
                            />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'center', marginLeft: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10%' }}>
                                <Text style={[pagesStyles.h2, { color: 'rgba(0, 174, 194, 1)', fontWeight: '400', textAlign: 'left' }]}>Выполнено</Text>
                                <Text style={[pagesStyles.h2, { fontWeight: '400', textAlign: 'left' }]}>66.7%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10%', paddingBottom: '8%' }}>
                                <Text style={[pagesStyles.h2, { color: 'rgba(64, 134, 244, 1)', fontWeight: '400', textAlign: 'left' }]}>Не выполнено</Text>
                                <Text style={[pagesStyles.h2, { fontWeight: '400', textAlign: 'left', }]}>33.3%</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Text style={[pagesStyles.h2, { color: '#2F2F2F', fontWeight: '400', textAlign: 'left', paddingVertical: '3%', textDecorationLine: 'underline' }]}>Список выполненых объектов</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[pagesStyles.h2, { color: '#2F2F2F', fontWeight: '400', textAlign: 'left', paddingVertical: '3%', textDecorationLine: 'underline' }]}>Список не выполненых объектов</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10%', paddingHorizontal: '5%' }}>
                            <TouchableOpacity>
                                <Text style={[pagesStyles.h2, { color: '#4086F4', textDecorationLine: 'underline', }]}>Скачать отчёт</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={[pagesStyles.h2, { color: 'rgba(255, 98, 98, 1)', textDecorationLine: 'underline', }]}>Удалить отчёт</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ReportModal