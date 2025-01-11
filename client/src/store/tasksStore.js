//Глобальное хранилище для пользователя.
import { makeAutoObservable, action } from "mobx"

export default class TasksStore {
    constructor() {
        this._tasks = []
        makeAutoObservable(this)//Следим за изменением переменных
    }

    @action
    setTasks(arr) {
        this._tasks = arr
    }

    @action
    removeTask(task) {
        this._tasks = this._tasks.filter(obj => obj.id !== task);
    }

    @action
    get tasks() {
        return this._tasks
    }


}