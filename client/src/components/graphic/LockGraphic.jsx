import { Svg, Path } from 'react-native-svg';
import { StyleSheet, View, Image } from 'react-native';

const LockGraphic = () => {
    return (
        <View style={styles.image}>
            <Svg style={styles.ellipse} width="269" height="253" viewBox="0 0 269 253" fill="none">
                <Path d="M2.93404 223.363C-12.2115 161.124 52.609 51.8745 96.3725 24.8795C140.136 -2.1155 233.183 -14.1201 260.083 29.49C286.984 73.1 249.866 173.974 183.444 189.916C135.026 201.536 59.5196 300.708 2.93404 223.363Z" fill="#FFECBC" />
            </Svg>
            <Image source={require('../../../assets/Lock.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        position: 'relative',
        zIndex: 1,
        alignItems: 'center',
    },
    ellipse: {
        position: 'absolute',
        top: -50,
        left: 0
    },
})

export default LockGraphic