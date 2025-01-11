import { TextInput } from 'react-native';

import { pagesStyles } from '../../../styles/pagesStyles';

const TaskHeaderInput = ({ value, setValue }) => {
    return (
        <TextInput
            style={[pagesStyles.decoration, { color: '#2A7DEE', fontWeight: '400', textAlign: 'left', padding: '4%', paddingLeft: '4%' }]}
            value={value}
            onChangeText={setValue}
        />
    )
}

export default TaskHeaderInput