import React, { useState, useRef, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Context } from '../../../../App';

const Switch = () => {
    const { user } = useContext(Context)
    const [isEnabled, setIsEnabled] = useState(false);
    const translateValue = useRef(new Animated.Value(0)).current;

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (user.role == 'CLEANER') user.setRole('MANAGER')
        else user.setRole('CLEANER')
        

        Animated.timing(translateValue, {
            toValue: isEnabled ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const interpolatedTranslateX = translateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 142],
    });

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
            <View style={styles.container}>
                <View style={styles.switch}>
                    <Animated.View
                        style={[
                            styles.labelContainer,
                            { transform: [{ translateX: interpolatedTranslateX }] },
                        ]}
                    >
                    </Animated.View>
                    <View style={styles.buttonContainer}>
                        <Text style={[styles.text, {marginLeft: '5%'}, !isEnabled && styles.textEnable]}>Клининг{`\n`}компания</Text>
                        <Text style={[styles.text, isEnabled && styles.textEnable]}>Управляющая{`\n`}компания</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    switch: {
        width: 314,
        height: 72,
        borderRadius: 50,
        backgroundColor: 'rgba(42, 125, 238, 1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 1)',

    },
    labelContainer: {
        position: 'absolute',
        width: 170,
        height: 70,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '11%',
        paddingTop: '5%',
    },
    text: {
        fontFamily: 'Assistant-VariableFont_wght',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 13,
        lineHeight: 17,
        textAlign: 'center',
        zIndex: 1,
        color: '#FFFFFF',
    },
    textEnable: {
        color: '#000000',
    }
});

export default Switch;