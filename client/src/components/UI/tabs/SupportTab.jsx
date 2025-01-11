import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { tabsStyles } from '../../../styles/tabsStyles';
import ImageTemplate from '../buttons/ImageTemplate';

import FillButton from '../buttons/FillButton';
import BlankButton from '../buttons/BlankButton';

const SupportTab = () => {
    return (
        <View style={tabsStyles.tabComponentContainer}>
            <View style={{ marginTop: '20%', marginBottom: '3%' }}>
                <Text style={styles.h0}>Чем можем помочь?</Text>
            </View>
            <View style={{ marginBottom: '3%' }}>
                <Text style={styles.h1}>Свяжитесь с нами если у вас возникли вопросы</Text>
            </View>
            <View style={{ marginBottom: '3%' }}>
                <TextInput style={styles.input} numberOfLines={10} placeholderTextColor='#707070' placeholder="Введите вопрос" textAlignVertical="top" multiline={true} />
            </View>
            <View style={{ marginBottom: '3%' }}>
                <Text style={styles.decoration}>Прикрепите фото</Text>
            </View>
            <View style={{ marginBottom: '3%' }}>
                <ImageTemplate />
            </View>
            <FillButton content={"Отправить"} style={{ marginBottom: '3%' }} />
            <BlankButton content={"Чат с менеджером"} />
        </View>
    )
}

const styles = StyleSheet.create({
    h0: {
        color: '#000000',
        lineHeight: 39,
        fontSize: 30,
        fontWeight: '700',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
    },
    h1: {
        fontFamily: 'Assistant-VariableFont_wght',
        color: '#747474',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 26,
    },
    input: {
        borderWidth: 1,
        borderColor: '#A6A6A6',
        borderRadius: 10,
        fontFamily: 'Assistant-VariableFont_wght',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 20,
        fontStyle: 'normal',
        color: '#414141',
        textAlign: 'left',
        padding: 20

    },
    decoration: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 20,
        color: '#747474',
        textAlign: 'left',
    },
})

export default SupportTab