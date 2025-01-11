//Глобальное хранилище для пользователя.
import { makeAutoObservable, action } from "mobx"

export default class ReportsStore {
    constructor() {
        this._reports = []
        makeAutoObservable(this)//Следим за изменением переменных
    }

    @action
    setReports(arr) {
        this._reports = arr
    }

    @action
    removeReport(report) {
        this._reports = this._reports.filter(obj => obj.id !== report);
    }

    @action
    get reports() {
        return this._reports
    }


}