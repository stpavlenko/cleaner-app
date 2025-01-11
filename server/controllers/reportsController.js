const ApiError = require('../exeptions/ApiError')
const { Tasks, Reports, ReportsTasks, Executions, Users } = require('../models/models')
const { Op } = require('sequelize');

class ReportsController {
    async create(req, res, next) {
        const userId = req.user.id
        const { from, to } = req.body
        // 2023-06-16 - формат даты
        const startDate = new Date(from)
        const endDate = new Date(to);
        const tasks = await Tasks.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                },
                userId
            },
            include: [
                {
                    model: Executions,
                    include: Users
                }
            ]
        })
        if (!tasks) {
            return next(ApiError.BadRequest('Некорректный диапазон дат'))
        }
        const report = await Reports.create({ userId, range: [from, to] }).then((response) => {
            tasks.forEach(async (task) => {
                await ReportsTasks.create({ taskId: task.id, reportId: response.id })
            })
        })
        return res.json({ message: 'OK' })
    }

    async get(req, res, next) {
        const userId = req.user.id
        const reports = await Reports.findAll({
            where: { userId },
            include: [{
                model: Tasks,
                through: ReportsTasks,
                include: [{
                    model: Executions,
                    include: Users,
                }]
            }]
        })
        return res.json({ reports })
    }

    async delete(req, res, next) {
        const userId = req.user.id
        const { id } = req.query
        const del = await Reports.destroy({
            where: { userId, id },
        })
        return res.json({ del }).status(200)
    }
}

module.exports = new ReportsController()