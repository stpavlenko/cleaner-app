import { Image, TouchableHighlight } from 'react-native';

const SettingsButton = ({onPress}) => {
    return (
        <TouchableHighlight onPress={onPress} underlayColor="white" style={{padding: '4%'}}>
            <Image source={require('../../../../assets/Settings.png')} />
        </TouchableHighlight>
    )
}

export default SettingsButton