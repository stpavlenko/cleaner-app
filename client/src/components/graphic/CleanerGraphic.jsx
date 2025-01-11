import { Svg, Circle, Path } from 'react-native-svg';
import { StyleSheet, View, Image } from 'react-native';

const CleanerGraphic = () => {
    return (
        <View style={styles.image}>
                <Svg style={styles.ellipse_1} width="231" height="170" viewBox="0 0 231 170">
                    <Path d="M7.45723 47.8388C35.2296 6.28183 139.134 -14.3773 180.691 13.3951C222.248 41.1674 246.473 99.5601 218.7 141.117C190.928 182.674 141.735 173.759 81.1415 147.153C36.8187 127.692 -20.3151 89.3958 7.45723 47.8388Z" fill="#D3E5F7" />
                </Svg>
                <Svg style={styles.ellipce_2} width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <Circle cx="16" cy="16" r="16" fill="rgba(0, 108, 255, 0.27)" />
                </Svg>
                <Svg style={styles.ellipce_3} width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <Circle cx="12.5" cy="12.5" r="12.5" fill="rgba(0, 108, 255, 0.27)" />
                </Svg>
                <Svg style={styles.ellipce_4} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <Circle cx="6.00002" cy="6.00002" r="6" fill="rgba(0, 108, 255, 0.27)" />
                </Svg>
                <Svg style={styles.ellipce_5} width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <Circle cx="4.00002" cy="4" r="4" fill="rgba(0, 108, 255, 0.27)" />
                </Svg>
                <Image source={require('../../../assets/Worker.png')}></Image>
            </View>
    )
}

const styles = StyleSheet.create({
    image: {
        position: 'relative',
        zIndex: 1,
        left: '10%',
    },
    ellipse_1: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    ellipce_2: {
        position: 'absolute',
        left: 40,
        top: 100
    },
    ellipce_3: {
        position: 'absolute',
        left: 145,
    },
    ellipce_4: {
        position: 'absolute',
        left: 215,
        top: 150,
    },
    ellipce_5: {
        position: 'absolute',
        left: 250,
        top: 100
    }
})

export default CleanerGraphic