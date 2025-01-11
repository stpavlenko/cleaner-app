const ApiError = require('../exeptions/ApiError')
const { Companies } = require('../models/models')


class CompanyController {
    async update(req, res, next) {
        const { email, tel, name } = req.body 
        const id = req.user.id // id - идентификатор пользователя
        const company = await Companies.findOne({ where: { userId: id } })
        if (!company) {
            return next(ApiError.BadRequest('Данные о компании не найдены.'))
        }
        company.set({
            email,
            tel,
            name
        })
        company.save()
        return res.json({ company })
    }

    async get(req, res, next) {
        const id = req.user.id
        const company = await Companies.findOne({ where: { userId: id } })
        if (!company) {
            return next(ApiError.BadRequest('Данные о компании не найдены.'))
        }
        return res.json({ company })
    }
}

module.exports = new CompanyController()