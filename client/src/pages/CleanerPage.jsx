import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import React from 'react'

import ProfileTab from '../components/UI/tabs/ProfileTab'
import SupportTab from '../components/UI/tabs/SupportTab'
import TasksTab from '../components/UI/tabs/TasksTab';


const BottomTab = createBottomTabNavigator();

const CleanerPage = () => {


    return (
        <BottomTab.Navigator
            screenOptions={() => ({
                labelStyle: {
                    fontSize: 10,
                    fontFamily: 'Assistant-VariableFont_wght',
                    fontWeight: '400',
                    textAlign: 'center',
                },
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderColor: '#D2D2D2',
                    height: '8%',
                    paddingBottom: '2%',
                    shadowColor: '#FFFFFF',
                    marginHorizontal: '5%',
                },
                headerShown: false,
                tabBarActiveTintColor: 'rgba(42, 125, 238, 1)',
                tabBarInactiveTintColor: 'rgba(72, 72, 72, 1)',
                tabBarHideOnKeyboard: true,
            })}
        >
            <BottomTab.Screen name="Задачи" component={TasksTab} options={{
                tabBarIcon: ({ focused }) => (

                    <Image source={focused
                        ? require('../../assets/ActiveBroom.png')
                        : require('../../assets/Broom.png')} />
                )
            }}>
            </BottomTab.Screen>
            <BottomTab.Screen name="Профиль" component={ProfileTab} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={focused
                        ? require('../../assets/ActiveProfile.png')
                        : require('../../assets/Profile.png')} />
                )
            }} />
            <BottomTab.Screen name="Поддержка" component={SupportTab} options={{
                tabBarVisibilityAnimationConfig: {},
                tabBarIcon: ({ focused }) => (
                    <Image source={focused
                        ? require('../../assets/ActiveSupport.png')
                        : require('../../assets/Support.png')} />
                )
            }} />
        </BottomTab.Navigator>
    )
}

export default CleanerPage