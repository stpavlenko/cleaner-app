import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';

import CleanerTasksList from '../lists/CleanerTasksList';
import ManagerTasksList from '../lists/ManagerTasksList';

import { Context } from '../../../../App';

const CurrentTab = observer(() => {
    const { user, tasks } = useContext(Context)

    return (
        user.user.role == 'CLEANER' ? (
            <CleanerTasksList list={tasks.tasks} status={false} />
        ) : (
            <ManagerTasksList list={tasks.tasks} status={false} />
        )
    )
})


export default CurrentTab