import React, { useState, useContext } from 'react'
import { Text, View, TextInput, Image, Pressable, Alert, Modal } from 'react-native';

import LockGraphic from '../components/graphic/LockGraphic';
import { pagesStyles } from '../styles/pagesStyles';
import { modalStyles } from '../styles/modalStyles';
import { sendRecoveryEmail, checkRecoveryCode, changePassword } from '../http/userAPI';
import { Context } from '../../App';
import { AUTH } from '../utils/consts';

const ForgotPage = ({ navigation }) => {
    const { user } = useContext(Context)

    const [email, setEmail] = useState(null)
    const [visible, setVisible] = useState(false)
    const [code, setCode] = useState(null)
    const [password, setPassword] = useState(null)

    const [isChecked, setIsChecked] = useState(false)

    const back = () => {
        navigation.goBack()
    }

    const send = () => {
        if (!email) {
            return Alert.alert("Внимание", "Не все поля заполнены", [{ text: "OK" }])
        }
        sendRecoveryEmail(email, user.role).then(() => {
            setVisible(true)
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

    const sendCode = () => {
        if (!code) {
            return Alert.alert("Внимание", "Не все поля заполнены.", [{ text: "OK" }])
        }
        checkRecoveryCode(email, code, user.role).then(() => {
            setIsChecked(true)
        }).catch((error) => {
            setVisible(false)
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })

    }

    const updatePassword = () => {
        if (!password) {
            Alert.alert("Внимание", "Не все поля заполнены.", [{ text: "OK" }])
        }
        changePassword(email, user.role, password).then(() => {
            setIsChecked(false)
            navigation.navigate(AUTH)
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

    return (
        <View style={pagesStyles.container}>
            <View style={[pagesStyles.contentContainer, { marginTop: '30%' }]}>
                <View style={{ marginBottom: '40%' }}>
                    <LockGraphic />
                </View>
                <View style={{ marginBottom: '5%' }}>
                    <Text style={pagesStyles.h1}>Забыли пароль?</Text>
                </View>
                <View style={{ marginBottom: '5%' }}>
                    <Text style={pagesStyles.decoration}>Введите вашу электронную почту, для получения письма c восстановлением пароля.</Text>
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
                <View style={{ marginBottom: '10%' }}>
                    <Pressable
                        style={pagesStyles.button}
                        onPress={() => send()}
                    >
                        <Text style={pagesStyles.buttonText}>Отправить</Text>
                    </Pressable>
                </View>
                <Text style={pagesStyles.navigation} onPress={() => back()}>Назад <Image source={require('../../assets/Back.png')} /></Text>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
            >
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.modalContainer}>
                        <View style={{ padding: '5%' }}>
                            <Text style={modalStyles.closeModalButton} onPress={() => setVisible(false)}>
                                Закрыть
                            </Text>
                            <View style={{ marginBottom: '5%' }}>
                                <Text style={pagesStyles.h1}>Восстановление доступа</Text>
                            </View>
                            {isChecked ? (
                                <>
                                    <View style={{ marginBottom: '5%' }}>
                                        <Text style={[pagesStyles.decoration, { fontSize: 15 }]}>Введите новый пароль.</Text>
                                    </View><View style={{ marginBottom: '5%' }}>
                                        <TextInput
                                            textContentType={'password'}
                                            placeholderTextColor='#707070'
                                            style={[pagesStyles.input, { fontSize: 15 }]}
                                            value={password}
                                            onChangeText={(password) => setPassword(password)}
                                            onSubmitEditing={() => updatePassword()}
                                            placeholder='New password'
                                            secureTextEntry={true}
                                        >
                                        </TextInput>
                                    </View>
                                </>
                            ) : (
                                <><View>
                                    <Text style={[pagesStyles.decoration, { fontSize: 15 }]}>Введите пятизначный код, отправленный по адресу {email}.</Text>
                                </View>
                                    <View>
                                        <TextInput
                                            textContentType={'emailAddress'}
                                            placeholderTextColor='#707070'
                                            style={[pagesStyles.input, { fontSize: 15 }]}
                                            keyboardType="numeric"
                                            value={code}
                                            onChangeText={(code) => setCode(code)}
                                            onSubmitEditing={() => sendCode()}
                                        >
                                        </TextInput>
                                    </View></>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ForgotPage