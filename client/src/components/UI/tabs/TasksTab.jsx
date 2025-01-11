import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useContext, useState } from 'react'
import { ActivityIndicator, View, Alert } from 'react-native'

import CurrentTab from './CurrentTab';
import CompletedTab from './CompletedTab';

import { Context } from '../../../../App';

import { getCleanerTasks, getManagerTasks } from '../../../http/tasksAPI';

const TopTab = createMaterialTopTabNavigator();

const TasksTab = () => {

    const [isLoading, setIsLoading] = useState(true)

    const { user, tasks } = useContext(Context)

    // Получаем все данные о задачах
    useEffect(() => {
        user.user.role == 'CLEANER' ?
            getCleanerTasks().then((response) => {
                // console.log(response.data.tasks)
                tasks.setTasks(response.data.tasks)
                setIsLoading(false)
            }).catch((error) => {
                Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
            })
            :
            getManagerTasks().then((response) => {
                // console.log(response.data.tasks)
                tasks.setTasks(response.data.tasks)
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
        <TopTab.Navigator
            screenOptions={{
                tabBarStyle: {
                    borderBottomWidth: 1,
                    borderColor: '#D2D2D2',
                    marginHorizontal: '5%',
                    shadowColor: '#FFFFFF',
                    paddingTop: '10%'
                },
                tabBarLabelStyle: {
                    fontFamily: 'Assistant-VariableFont_wght',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: 20,
                    lineHeight: 26,
                    textTransform: 'capitalize',
                },
                tabBarActiveTintColor: 'rgba(42, 125, 238, 1)',
                tabBarInactiveTintColor: 'rgba(72, 72, 72, 1)',
            }}
        >
            <TopTab.Screen name='Текущие' component={CurrentTab} options={({ route }) => ({
                tabBarIndicatorStyle: route.name === 'Текущие'
                    ? { borderBottomWidth: 4, borderBottomColor: 'rgba(42, 125, 238, 1)', }
                    : {},
            })} />
            <TopTab.Screen name="Исполненные" component={CompletedTab} options={({ route }) => ({
                tabBarIndicatorStyle: route.name === 'Исполненные'
                    ? { borderBottomWidth: 4, borderBottomColor: 'rgba(42, 125, 238, 1)', }
                    : {}
            })} />
        </TopTab.Navigator>
    )
}

export default TasksTab