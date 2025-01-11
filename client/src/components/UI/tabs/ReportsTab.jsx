import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'

import ReportsList from '../lists/ReportsList';

const TopTab = createMaterialTopTabNavigator();

const ReportsTab = () => {

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
                    fontWeight: '400',
                    fontSize: 20,
                    lineHeight: 26,
                    textTransform: 'capitalize',
                },
                tabBarActiveTintColor: 'rgba(42, 125, 238, 1)',
                tabBarInactiveTintColor: 'rgba(72, 72, 72, 1)',
            }}
        >
            <TopTab.Screen name='Отчеты' component={ReportsList} options={({ route }) => ({
                tabBarIndicatorStyle: route.name === 'Отчеты'
                    ? { borderBottomWidth: 4, borderBottomColor: 'rgba(42, 125, 238, 1)', }
                    : {},
            })} />
        </TopTab.Navigator>
    )
}

export default ReportsTab