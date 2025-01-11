import { Svg, Circle, Path } from 'react-native-svg';
import { StyleSheet, View, Image } from 'react-native';

const UserGraphic = () => {
    return (
        <View style={styles.image}>
                <Svg style={styles.ellipse_1} width="235" height="176" viewBox="0 0 235 176" fill="none">
                    <Path d="M234.217 47.1013C234.456 98.34 157.752 175.492 106.333 175.731C54.9135 175.971 0.648635 140.253 0.40958 89.0144C0.170525 37.7757 47.2472 17.1338 114.226 4.98328C163.219 -3.9046 233.978 -4.1374 234.217 47.1013Z" fill="#FFA372" />
                </Svg>
                <Svg style={styles.ellipce_2} width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <Circle cx="12.5" cy="12.5" r="12.5" fill="rgba(255, 89, 0, 0.27)" />
                </Svg>
                <Svg style={styles.ellipce_3} width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <Circle cx="12.5" cy="12.5" r="12.5" fill="rgba(255, 89, 0, 0.27)" />
                </Svg>
                <Svg style={styles.ellipce_4} width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <Circle cx="5" cy="5" r="5" fill="rgba(255, 89, 0, 0.27)" />
                </Svg>
                <Image source={require('../../../assets/User.png')} />
            </View>
    )
}

const styles = StyleSheet.create({
    image: {
        position: 'relative',
        zIndex: 1,
        left: '25%',
    },
    ellipse_1: {
        position: 'absolute',
        left: 0,
        bottom: 20
    },
    ellipce_2: {
        position: 'absolute',
        left: 0,
        bottom: 120,
    },
    ellipce_3: {
        position: 'absolute',
        left: 150,
        bottom: 150,
    },
    ellipce_4: {
        position: 'absolute',
        left: 215,
        bottom: 100,
    }
})

export default UserGraphic