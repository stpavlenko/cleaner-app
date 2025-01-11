import { Text, View, TouchableOpacity } from 'react-native';

import { pagesStyles } from '../../../styles/pagesStyles';

const StatusItem = ({onPress}) => {
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '5%' }}>
                <Text style={[pagesStyles.h2, { color: '#6F6F6F' }]}>Статус:</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={[pagesStyles.h2, { color: '#4086F4', textDecorationLine: 'underline', }]}>Просмотреть отчёт</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: '5%', paddingBottom: '5%' }}>
                <Text style={[pagesStyles.h2, { color: '#009F2D', textAlign: 'left', }]}>Выполнено</Text>
            </View>
        </>
    )
}

export default StatusItem