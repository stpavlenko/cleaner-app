import { Svg, Circle } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

const Points = ({fill_1, fill_2}) => {
    return (
        <View style={styles.container}>
            <Svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <Circle cx="4" cy="4" r="3.5" fill={fill_1} stroke="#2A7DEE" />
            </Svg>
            <Svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <Circle cx="4" cy="4" r="3.5" fill={fill_2} stroke="#2A7DEE" />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '45%'
    }
})

export default Points;