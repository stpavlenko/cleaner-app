import { Text, View, TouchableOpacity } from 'react-native';

import { pagesStyles } from '../../../styles/pagesStyles';

const ButtonsPanel = ({ onConfirm, onRefuse, status }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
                style={[pagesStyles.button, !status ? { borderRadius: 5, borderColor: '#2A7DEE', margin: '5%' } : { borderRadius: 5, backgroundColor: '#2A7DEE', borderColor: '#2A7DEE', margin: '5%' }]}
                onPress={onConfirm}
            >
                <Text style={[pagesStyles.decoration, status ? { color: '#FFFFFF', paddingHorizontal: '7%' } : { color: '#2A7DEE', paddingHorizontal: '9%' }]}>
                    Выполнено
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[pagesStyles.button, status ? { borderRadius: 5, borderColor: '#2A7DEE', margin: '5%' } : { borderRadius: 5, backgroundColor: '#2A7DEE', borderColor: '#2A7DEE', margin: '5%' }]}
                onPress={onRefuse}
            >
                <Text style={[pagesStyles.decoration, !status ? { color: '#FFFFFF', paddingHorizontal: '7%' } : { color: '#2A7DEE', paddingHorizontal: '9%' }]}>
                    Не выполнено
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonsPanel