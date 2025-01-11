import { View, Image } from 'react-native';

import ImageTemplate from '../buttons/ImageTemplate';

const LittleImageSlider = ({ images, max, addImage }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {images && images.map((image, index) => (
                <Image source={{ uri: image }} style={{ width: 60, height: 60, borderRadius: 5, marginRight: '3%' }} key={index} />
            ))}
            {images.length < max ? (
                <ImageTemplate onPress={addImage} />
            ) : null}
        </View>
    )
}

export default LittleImageSlider