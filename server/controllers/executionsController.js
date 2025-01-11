const uuid = require('uuid')
const path = require('path')
const PDFDocument = require('pdfkit');
const fs = require('fs')

const ApiError = require('../exeptions/ApiError')
const { Executions, Tasks } = require('../models/models')

const createImageGrid = (doc, images) => {

    images.forEach((image, index) => {
        // Получаем размеры страницы
        const { width, height } = doc.page;

        let pathFile = path.resolve(__dirname, "..", "static", image);

        // Добавляем изображение на страницу в полном размере
        doc.image(pathFile, 0, 0, { width, height });

        if (images[index + 1]) doc.addPage();
    });
}


class ExecutionsController {

    async update(req, res, next) {
        const userId = req.user.id
        const { id, status } = req.body
        const photos = req.files
        let task = await Executions.findOne({
            where: { id, userId }, include: [{
                model: Tasks
            }]
        })
        if (!task) {
            return next(ApiError.BadRequest('Задача не найдена'))
        }
        let array = []
        // Перебор объекта с фотографиями
        Object.entries(photos).forEach(([key, value]) => {
            let fileName = uuid.v4() + ".jpg"
            value.mv(path.resolve(__dirname, '..', 'static', fileName))
            array.push(fileName)
        });
        task.set({
            status,
            photos: array,
        })
        task.save()

        return res.json({ task })
    }

    async get(req, res, next) {
        const userId = req.user.id
        let tasks = await Executions.findAll({
            where: { userId }, include: [{
                model: Tasks
            }]
        })

        return res.json({ tasks })
    }

    // Генерация отчёта о проделанной работе
    async download(req, res, next) {
        const { id, userId } = req.query // id - execution, userId - id исполнителя
        const execution = await Executions.findOne({
            where: { id, userId }, include: [{
                model: Tasks
            }]
        })
        // Если есть старый отчёт, удаляем его
        if (execution.file) {
            return res.json({ "file": execution.file })
        } else {
            if (!execution.status) {
                return next(ApiError.BadRequest('Невозможно сгенерировать отчёт. Задача не выполнена.'))
            }
            // Создаём новый PDF
            if (!execution.photos) {
                return next(ApiError.BadRequest('Невозможно сгенерировать отчёт. Отсутствуют фотографии.'))
            }
            const doc = new PDFDocument({
                font: path.resolve(__dirname, "..", "assets", 'DejaVuSans.ttf')
            });
            doc.fontSize(20)
            let fileName = uuid.v4() + ".pdf"
            let pathFile = path.resolve(__dirname, "..", "static", fileName);
            createImageGrid(doc, execution.photos)
            doc.pipe(fs.createWriteStream(pathFile));
            doc.end()
            execution.set({
                file: fileName
            })
            execution.save().then(() => {
                return res.json({ "file": fileName })
            })
        }
    }
}

module.exports = new ExecutionsController()