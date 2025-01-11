import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';


const ImageTemplate = ({onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
                <View style={styles.image}>
                    <Image source={require('../../../../assets/Landscape.png')} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        width: 60,
        height: 60,
    },
    image: {
        position: 'relative',
        top: '50%',
        left: '25%',
    },
})

export default ImageTemplate