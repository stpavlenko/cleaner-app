import { StyleSheet, View } from 'react-native';

const Line = () => {
    return (
        <View style={styles.line} />
    )
}
const styles = StyleSheet.create({
    line: {
        borderBottomWidth: 1,
        borderColor: '#A6A6A6',
    }
})

export default Line