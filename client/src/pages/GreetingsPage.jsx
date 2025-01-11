import React, { useEffect, useContext, useState } from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import Points from '../components/graphic/Points';
import Switch from '../components/UI/buttons/Switch'
import CleanerGraphic from '../components/graphic/CleanerGraphic'

import { Context } from '../../App';

import { AUTH, CLEANER_MAIN_PAGE, MANAGER_MAIN_PAGE } from '../utils/consts';
import { pagesStyles } from '../styles/pagesStyles';

import { check } from '../http/userAPI';

const EnterPage = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useContext(Context)

    useEffect(() => {
        check().then((response) => {
            AsyncStorage.setItem('@token', response.data.token).then(() => {
                user.setUser(jwt_decode(response.data.token))
                if (user.user.role == "MANAGER") {
                    navigation.navigate(MANAGER_MAIN_PAGE)
                } else {
                    navigation.navigate(CLEANER_MAIN_PAGE)
                }
            })
        }).catch((e) => {
            console.log(e)
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [])

    const next = () => {
        navigation.navigate(AUTH)
    }

    if (isLoading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        )
    }

    return (
        <View>
            <View style={[pagesStyles.container, { marginTop: '30%' }]}>
                <View style={pagesStyles.contentContainer}>
                    <View style={{ marginBottom: '5%' }}>
                        <CleanerGraphic />
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Text style={pagesStyles.h1}>
                            Здравствуйте!
                        </Text>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Text style={pagesStyles.decoration}>
                            Это приложение “Cleaning check”. Мы проводим уборку помощений и территорий по вашему заказу.
                        </Text>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Text style={pagesStyles.h2}>Давайте определимся, кто вы?</Text>
                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Switch />
                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={pagesStyles.navigation} onPress={() => next()}>Далее <Image source={require('../../assets/Next.png')} /></Text>
                    </View>
                    <Points fill_1={"#2A7DEE"} fill_2={'none'} />
                </View>
            </View>
        </View>
    )
}

export default EnterPage