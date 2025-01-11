import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Context } from '../../../../App';

import ExitButton from '../buttons/ExitButton'
import CleanerProfile from '../profiles/CleanerProfile';
import ManagerProfile from '../profiles/ManagerProfile';

import { tabsStyles } from '../../../styles/tabsStyles';

import { GREETINGS_PAGE } from '../../../utils/consts';

const ProfileTab = ({ navigation }) => {
    const { user } = useContext(Context)

    const exit = async () => {
        await AsyncStorage.removeItem('@token').then(() => {
            navigation.navigate(GREETINGS_PAGE)
        })
    }

    return (
        <View style={tabsStyles.tabComponentContainer}>
            <ExitButton onPress={() => exit()} />
            <Text style={styles.h0}>Мой профиль</Text>
            {user.user.role == 'CLEANER' ? (
                <CleanerProfile />
            ) : (
                <ManagerProfile />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    h0: {
        color: '#000000',
        textAlign: 'left',
        lineHeight: 33,
        fontSize: 25,
        fontWeight: '700',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
        marginBottom: '4%',
    },
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
    },
    headerInfo: {
        color: '#000000',
        textAlign: 'left',
        lineHeight: 24,
        fontSize: 18,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
    },
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
    point: {
        color: '#2A7DEE',
        textAlign: 'left',
        lineHeight: 24,
        fontSize: 18,
        fontWeight: '600',
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

export default ProfileTab