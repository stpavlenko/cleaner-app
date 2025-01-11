import { $authHost } from "./index";

export const getCleanerTasks = async () => {
    return $authHost.get('api/executions')
}

export const getManagerTasks = async () => {
    return $authHost.get('api/tasks/')
}

export const executeTask = async (formData) => {
    return $authHost.put('api/executions/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const download = async (id, userId) => {
    return $authHost.get('api/executions/download', { params: { id, userId } })
}

export const updateTask = async (id, executionId, name, subname, status, date, time, place, recipientId) => {
    return $authHost.put('api/tasks/', { id, executionId, name, subname, status, date, time, place, recipientId })
}

export const deleteTask = async (id) => {
    return $authHost.delete('api/tasks/', { params: { id } })
}

export const createTask = async (name, subname, place, date, time, recipient_id) => {
    return $authHost.post('api/tasks/', { name, subname, place, date, time, recipient_id })
}

