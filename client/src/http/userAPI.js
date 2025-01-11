import { $host, $authHost } from "./index";

export const registration = async (email, password, role) => {
    return $host.post('api/user/registration', { email, password, role }, {
        responseType: 'json'
    })
}

export const login = (email, password, role) => {
    return $host.post('api/user/login/', { email, password, role }, {
        responseType: 'json',
    })
}

export const sendRecoveryEmail = async (email, role) => {
    return $host.post('api/user/send_email', { email, role })
}

export const checkRecoveryCode = async (email, code, role) => {
    return $host.post('api/user/recover', { email, code, role })
}

export const update = async (user) => {
    return $authHost.put('api/user/', user, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const changePassword = async (email, role, password) => {
    return $host.put('api/user/change_password', { email, role, password })
}

export const check = async () => {
    return $authHost.get('api/user/auth')
}

export const getCleaners = async () => {
    return $authHost.get('api/user/cleaners')
}