import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { GREETINGS_PAGE, AUTH, FORGOT_YOUR_PASSWORD, REGISTER, MANAGER_MAIN_PAGE, CLEANER_MAIN_PAGE } from '../utils/consts'

import GreetingsPage from '../pages/GreetingsPage'
import LoginPage from '../pages/LoginPage'
import ForgotPage from '../pages/ForgotPage'
import RegisterPage from '../pages/RegisterPage'
import ManagerPage from '../pages/ManagerPage'
import CleanerPage from '../pages/CleanerPage'

const Stack = createStackNavigator()

const MyTheme = {
    colors: {
        background: 'rgba(255, 255, 255, 1)',
    },
};

export default () => {

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name={GREETINGS_PAGE}
                    component={GreetingsPage}
                />
                <Stack.Screen
                    name={AUTH}
                    component={LoginPage}
                />
                <Stack.Screen
                    name={FORGOT_YOUR_PASSWORD}
                    component={ForgotPage}
                />
                <Stack.Screen
                    name={REGISTER}
                    component={RegisterPage}
                />
                <Stack.Screen
                    name={MANAGER_MAIN_PAGE}
                    component={ManagerPage}
                />
                <Stack.Screen
                    name={CLEANER_MAIN_PAGE}
                    component={CleanerPage}
                />
            </Stack.Navigator>
        </NavigationContainer >
    )
}