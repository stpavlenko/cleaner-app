import { Svg, Circle, Path } from 'react-native-svg';
import { StyleSheet, View, Image, Text } from 'react-native';

const RegisterGraphic = () => {
    return (
        <View style={styles.container}>
                <Svg style={styles.ellipse_1} width="360" height="251" viewBox="0 0 360 251" fill="none">
                    <Path d="M1.22827 208.746C-11.6697 146.082 79.875 29.3456 153.855 14.1185C227.835 -1.10855 390.879 -27.2842 354 85.8714C319.5 150.871 277.79 191.136 184.324 225.465C115.955 250.575 14.1262 271.41 1.22827 208.746Z" fill="#D3E5F7" />
                </Svg>
                <Svg style={styles.ellipce_2} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="12" fill="rgba(0, 108, 255, 0.27)"/>
                </Svg>
                <Svg style={styles.ellipce_3} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <Circle cx="8" cy="8" r="8" fill="rgba(0, 108, 255, 0.27)"/>
                </Svg>
                <Svg style={styles.ellipce_4} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <Circle cx="6" cy="6.00002" r="6" fill="rgba(0, 108, 255, 0.27)"/>
                </Svg>
                <Svg style={styles.ellipce_5} width="7" height="7" viewBox="0 0 7 7" fill="none">
                    <Circle cx="3.5" cy="3.5" r="3.5" fill="rgba(0, 108, 255, 0.27)"/>
                </Svg>
                <Image style={styles.image} source={require('../../../assets/Note.png')}/>
                <Text style={styles.text}>Регистрация</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1,
        alignItems: 'center'
    },
    image: {
        bottom: 120
    },
    text: {
        fontFamily: 'Assistant-VariableFont_wght',
        color: '#000000',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 25,
        lineHeight: 33,
        textAlign: 'center',
        position: 'absolute',
        bottom: 80
    },
    ellipse_1: {
        position: 'absolute',
        bottom: 0,
        right: -50
    },
    ellipce_2: {
        position: 'absolute',
        left: 40,
        bottom: 150,
    },
    ellipce_3: {
        position: 'absolute',
        left: 90,
        bottom: 20,
    },
    ellipce_4: {
        position: 'absolute',
        left: 215,
        bottom: 80
    }, 
    ellipce_5: {
        position: 'absolute',
        left: 250,
        bottom: 200,
    },

})

export default RegisterGraphic