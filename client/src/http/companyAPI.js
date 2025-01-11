import { $authHost } from "./index";

export const getCompany = async () => {
    return $authHost.get('api/company/')
}

export const updateCompany = async (formData) => {
    return $authHost.put('api/company/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

