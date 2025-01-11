import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { observer } from "mobx-react-lite";

import { Context } from '../../../../App';

import Line from '../../graphic/Line';
import ProfileItem from '../items/ProfileItem';

import { pagesStyles } from '../../../styles/pagesStyles';

import { update } from '../../../http/userAPI'

const CleanerProfile = observer(() => {
    const { user } = useContext(Context)

    const [fio, setFio] = useState(user.user.fio)
    const [email, setEmail] = useState(user.user.email)
    const [tel, setTel] = useState(user.user.tel)

    const selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Требуется резрешение на досуп к медиа!');
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        // console.log(pickerResult);

        if (!pickerResult.canceled) {
            // Обновляем локальное состояние и посылаем запрос на сервер
            changeUserInfo(pickerResult.assets[0].uri)
        }
    };


    const changeUserInfo = (img) => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('tel', tel)
        formData.append('fio', fio)
        if (img) {
            formData.append('photo', {
                uri: img,
                name: 'image.jpg',
                type: 'image/jpg',
            });
        }

        update(formData).then((response) => {
            AsyncStorage.setItem('@token', response.data.token).then(() => {
                user.setUser(jwt_decode(response.data.token))
            })
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

    return (
        <>
            <Text style={[styles.info, { color: '#8C8C8C' }]}>Личные данные клинера</Text>
            <Line />
            <View style={[styles.image, { marginTop: '8%' }]}>
                <Image source={{ uri: process.env.EXPO_PUBLIC_API_URL + user.user.photo }} style={{ width: 200, height: 200, borderRadius: 100 }} />
            </View>
            <TouchableOpacity onPress={selectImage}>
                <Text style={[pagesStyles.decoration, { color: '#8C8C8C', marginBottom: '5%' }]}>
                    Редактировать фото
                </Text>
            </TouchableOpacity>
            <Line />
            <View style={{ marginTop: '8%' }}>
                <ProfileItem label={"ФИО"} value={fio} onValueChange={(value) => setFio(value)} onSubmitEditing={() => changeUserInfo(null)} />
                <ProfileItem label={"Почта"} value={email} onValueChange={(value) => setEmail(value)} onSubmitEditing={() => changeUserInfo(null)} />
                <ProfileItem label={"Телефон"} value={tel} onValueChange={(value) => setTel(value)} onSubmitEditing={() => changeUserInfo(null)} />
            </View>
        </>
    )
})

const styles = StyleSheet.create({
    info: {
        color: '#4F4F4F',
        textAlign: 'left',
        lineHeight: 26,
        fontSize: 20,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
        marginBottom: '3%'
    },
    image: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: '5%'
    }
})

export default CleanerProfile