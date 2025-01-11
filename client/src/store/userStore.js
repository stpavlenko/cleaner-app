//Глобальное хранилище для пользователя.
import { makeAutoObservable, action } from "mobx"

export default class UserStore {
    constructor() {
        this._user = {}
        this._role = 'CLEANER' // 'MANAGER' || 'CLEANER'
        makeAutoObservable(this)//Следим за изменением переменных
    }

    @action
    setUser(user) {
        this._user = user
    }

    @action
    setRole(role) {
        this._role = role
    }

    //Getters (Computed - функции для получения переменных из состояния)

    @action
    get role() {
        return this._role
    }

    @action
    get user() {
        return this._user
    }
}