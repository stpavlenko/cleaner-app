import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

import ReportModal from '../modals/ReportModal';

const ReportItem = ({ range, objId, list, file }) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <TouchableOpacity style={styles.reportContainer} onPress={() => setVisible(!visible)}>
                <Text style={styles.reportText}>Отчет {range[0].replace(/-/g, ".")} - {range[1].replace(/-/g, ".")}</Text>
            </TouchableOpacity>
            <ReportModal
                modalVisible={visible}
                setModalVisible={() => setVisible(false)}
                objId={objId}
                range={range}
                list={list}
                file={file}
            />
        </>
    )
}

const styles = StyleSheet.create({
    reportContainer: {
        borderWidth: 1,
        borderColor: 'rgba(166, 166, 166, 1)',
        borderRadius: 10,
        padding: 20,
        marginTop: '5%'
    },
    reportText: {
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24,
        fontSize: 18,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Assistant-VariableFont_wght',
    }
})

export default ReportItem