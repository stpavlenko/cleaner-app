import { $authHost } from "./index";

export const getReports = async () => {
    return $authHost.get('api/reports')
}

export const createReport = async (from, to) => {
    return $authHost.post('api/reports/', { from, to })
}



