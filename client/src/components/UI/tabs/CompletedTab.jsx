import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';

import CleanerTasksList from '../lists/CleanerTasksList';
import ManagerTasksList from '../lists/ManagerTasksList';

import { Context } from '../../../../App';

const CompletedTab = observer(() => {
    const { user, tasks } = useContext(Context)

    return (
        user.user.role == 'CLEANER' ? (
            <CleanerTasksList list={tasks.tasks} status={true} />
        ) : (
            <ManagerTasksList list={tasks.tasks} status={true} />
        )
    )
})

export default CompletedTab