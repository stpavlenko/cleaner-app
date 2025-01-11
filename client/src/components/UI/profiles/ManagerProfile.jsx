import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, Alert, ActivityIndicator, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from 'mobx-react-lite';
import jwt_decode from "jwt-decode";

import { update } from '../../../http/userAPI'
import { updateCompany, getCompany } from '../../../http/companyAPI'

import Line from '../../graphic/Line';
import ProfileItem from '../items/ProfileItem';

import { Context } from '../../../../App';

const ManagerProfile = observer(() => {
    const { user, company } = useContext(Context)

    // Состояние загрузки
    const [isLoading, setIsLoading] = useState(true)

    // Состояния компании
    const [name, setName] = useState(null)
    const [corpEmail, setCorpEmail] = useState(null)
    const [corpTel, setCorpTel] = useState(null)
    // Состояния пользовтеля
    const [fio, setFio] = useState(user.user.fio)
    const [email, setEmail] = useState(user.user.email)
    const [tel, setTel] = useState(user.user.tel)

    useEffect(() => {
        getCompany().then((response) => {
            company.setCompany(response.data.company)
            setName(company.company.name)
            setCorpEmail(company.company.email)
            setCorpTel(company.company.tel)
            setIsLoading(false)
        })
    }, [])

    const updateUser = () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('tel', tel)
        formData.append('fio', fio)
        update(formData).then((response) => {
            AsyncStorage.setItem('@token', response.data.token).then(() => {
                user.setUser(jwt_decode(response.data.token))
            })
        }).catch((error) => {
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

    const updateCorporation = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', corpEmail)
        formData.append('tel', corpTel)
        updateCompany(formData).then((response) => {
            // console.log(response)
            company.setCompany(response.data.company)
        }).catch((error) => {
            console.log(error)
            Alert.alert("Внимание", error.response.data.message, [{ text: "OK" }])
        })
    }

    if (isLoading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20%' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <>
            <Line />
            <Text style={styles.h1}>О компании</Text>
            <ProfileItem label={"Название компании"} value={name} onValueChange={(value) => setName(value)} onSubmitEditing={updateCorporation} />
            <ProfileItem label={"Почта"} value={corpEmail} onValueChange={(value) => setCorpEmail(value)} onSubmitEditing={updateCorporation} />
            <ProfileItem label={"Телефон"} value={corpTel} onValueChange={(value) => setCorpTel(value)} onSubmitEditing={updateCorporation} />
            <Line />

            <Text style={styles.h1}>Должностное лицо</Text>
            <ProfileItem label={"ФИО"} value={fio} onValueChange={(value) => setFio(value)} onSubmitEditing={updateUser} />
            <ProfileItem label={"Почта"} value={email} onValueChange={(value) => setEmail(value)} onSubmitEditing={updateUser} />
            <ProfileItem label={"Телефон"} value={tel} onValueChange={(value) => setTel(value)} onSubmitEditing={updateUser} />
        </>
    )
})

const styles = StyleSheet.create({
    h1: {
        fontFamily: 'Assistant-VariableFont_wght',
        textAlign: 'left',
        color: '#000000',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 26,
        marginTop: '5%',
        marginBottom: '5%',
    }
})

export default ManagerProfile