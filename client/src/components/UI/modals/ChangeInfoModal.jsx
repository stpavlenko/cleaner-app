import { View, Modal, Text } from 'react-native';
import React from "react";
import { observer } from 'mobx-react-lite';

import { modalStyles } from '../../../styles/modalStyles';

import ChangeInfoPanel from '../panels/ChangeInfoPanel';

const ChangeInfoModal = observer(({
    modalVisible,
    setModalVisible,
    date,
    setDate,
    street,
    setStreet,
    building,
    setBuilding,
    rc,
    setRc,
    housing,
    setHousing,
    section,
    setSection,
    floor,
    setFloor,
    startTime,
    setStartTime,
    finishTime,
    setFinishTime
}) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
        >
            <View style={modalStyles.overlay}>
                <View style={modalStyles.modalContainer}>
                    <View style={{ padding: '5%' }}>
                        <Text style={modalStyles.closeModalButton} onPress={setModalVisible}>
                            Закрыть
                        </Text>
                        <ChangeInfoPanel
                            date={date}
                            setDate={setDate}
                            street={street}
                            setStreet={setStreet}
                            building={building}
                            setBuilding={setBuilding}
                            rc={rc}
                            setRc={setRc}
                            housing={housing}
                            setHousing={setHousing}
                            section={section}
                            setSection={setSection}
                            floor={floor}
                            setFloor={setFloor}
                            startTime={startTime}
                            setStartTime={setStartTime}
                            finishTime={finishTime}
                            setFinishTime={setFinishTime}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default ChangeInfoModal