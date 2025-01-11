import React, { useState, useContext } from 'react'
import { Alert, Text, View, TextInput, Image, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import Points from '../components/graphic/Points';
import UserGraphic from '../components/graphic/UserGraphic';
import { Context } from '../../App';
import { FORGOT_YOUR_PASSWORD, REGISTER, MANAGER_MAIN_PAGE, CLEANER_MAIN_PAGE } from '../utils/consts';
import { pagesStyles } from '../styles/pagesStyles';
import { login } from '../http/userAPI';

const LoginPage = ({ navigation }) => {
    const { user } = useContext(Context)

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const auth = () => {
        if (!email || !password) {
            return Alert.alert("Внимание", "Не все поля заполнены.", [{ text: "OK" }])
        } else {
            login(email, password, user.role).then((response) => {
                AsyncStorage.setItem('@token', response.data.token).then(() => {
                    user.setUser(jwt_decode(response.data.token))
                    user.role == "MANAGER" ? (navigation.navigate(MANAGER_MAIN_PAGE)) : (navigation.navigate(CLEANER_MAIN_PAGE))
                })
            }).catch((error) => {
                Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
            })
        }
    }

    return (
        <View>
            <View style={pagesStyles.container}>
                <View style={[pagesStyles.contentContainer, { marginTop: '40%' }]}>
                    <View style={{ marginBottom: '5%' }}>
                        <UserGraphic />
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Text style={pagesStyles.h1}>Вход в личный кабинет</Text>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Text style={pagesStyles.decoration}>Войдите или зарегистрируйтесь в личном кабинете</Text>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <TextInput
                            textContentType={'emailAddress'}
                            placeholderTextColor='#707070'
                            style={pagesStyles.input}
                            placeholder='Email'
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                        >
                        </TextInput>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <TextInput
                            textContentType={'password'}
                            secureTextEntry={true}
                            placeholderTextColor='#707070'
                            style={pagesStyles.input}
                            placeholder='Password'
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                        >
                        </TextInput>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Pressable style={pagesStyles.button} onPress={() => auth()}><Text style={pagesStyles.buttonText}>Войти</Text></Pressable>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Text style={pagesStyles.questions} onPress={() => navigation.navigate(FORGOT_YOUR_PASSWORD)}>Забыли пароль?</Text>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Text style={pagesStyles.choose} onPress={() => navigation.navigate(REGISTER)}>Или зарегестрируйтесь</Text>
                    </View>
                    <View style={{ marginBottom: '5%' }}>
                        <Points fill_1={'none'} fill_2={'#2A7DEE'} />
                    </View>
                    <Text style={pagesStyles.navigation} onPress={() => navigation.goBack()}>Назад <Image source={require('../../assets/Back.png')} /></Text>
                </View>
            </View>
        </View>
    )
}

export default LoginPage