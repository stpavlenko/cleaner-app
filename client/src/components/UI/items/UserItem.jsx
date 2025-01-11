import { Text, View, Image } from 'react-native';
import React from 'react'
import { pagesStyles } from '../../../styles/pagesStyles';

const UserItem = ({ uri, fio }) => {

    return (
        <View style={{ padding: '4%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text
                        style={[pagesStyles.decoration, { fontWeight: '400', color: '#5E5E5E', textAlign: 'left', }]}
                    >
                        Клинер
                    </Text>
                    <Text
                        style={[pagesStyles.decoration, { fontWeight: '400', color: '#000000', textAlign: 'left', }]}
                    >
                        {fio && fio.split(' ')[0]} {fio && fio.split(' ')[1]}
                    </Text>
                    <Text
                        style={[pagesStyles.decoration, { fontWeight: '400', color: '#000000', textAlign: 'left', }]}
                    >
                        {fio && fio.split(' ')[2]}
                    </Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Image source={{ uri }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                </View>
            </View>
        </View>
    )
}

export default UserItem