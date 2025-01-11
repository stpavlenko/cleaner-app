const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const ApiError = require('../exeptions/ApiError')
const { Tasks, Executions, Users } = require('../models/models')



class TasksController {
    async create(req, res, next) {
        const { name, subname, place, date, time, recipient_id } = req.body
        const id = req.user.id
        const task = await Tasks.create({ name, subname, place, time, date, userId: id })
        await Executions.create({ taskId: task.id, userId: recipient_id })
        const obj = await Tasks.findOne({
            where: { id: task.id }, include: [{
                model: Executions,
                include: Users
            }]
        })
        return res.json(obj)
    }

    async update(req, res, next) {
        const userId = req.user.id
        const { id, executionId, name, subname, status, date, time, place, recipientId } = req.body
        let task = await Tasks.findOne({ where: id, userId })
        if (!task) {
            return next(ApiError.BadRequest('Задача не найдена'))
        }
        task.set({
            name,
            subname,
            place,
            time,
            date,
        })
        task.save()
        let execution = await Executions.findOne({
            where: { id: executionId, taskId: id }, include: [{
                model: Users
            }]
        })
        execution.set({
            status,
            userId: recipientId
        })
        // Если менеджер отклоняет задачу, чистим из базы и из сервера отчёты и фотографии
        if (!status) {
            try {
                execution.photos.forEach((photo) => {
                    fs.unlink(path.resolve(__dirname, "..", "static", photo), (e) => {
                        console.log(e)
                    });
                });
                fs.unlink(path.resolve(__dirname, "..", "static", execution.file), (e) => {
                    console.log(e)
                });
                execution.set({
                    photos: null,
                    file: null
                })
            }
            catch (e) {
                console.log(e)
            }
        }
        execution.save()

        return res.json({ task, execution })
    }

    async get(req, res, next) {
        const userId = req.user.id
        let tasks = await Tasks.findAll({
            where: { userId }, include: [{
                model: Executions,
                include: [{
                    model: Users
                }]
            }]
        }).catch((e) => {
            console.log(e)
        })
        return res.json({ tasks })
    }

    async delete(req, res, next) {
        const userId = req.user.id
        const { id } = req.query
        const del = await Executions.destroy({ where: { taskId: id } }).then(() => {
            Tasks.destroy({
                where: { userId, id }
            })
        }).catch((e) => {
            console.log(e)
        })
        return res.json({ message: 'OK' }).status(200)
    }
}

module.exports = new TasksController()