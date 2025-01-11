import { makeAutoObservable, action } from "mobx"

export default class CompanyStore {
    constructor() {
        this._company = {}
        makeAutoObservable(this)
    }

    @action
    setCompany(obj) {
        this._company = obj
    }

    @action
    get company() {
        return this._company
    }
}