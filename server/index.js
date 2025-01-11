const express = require('express')//Импорт express
require('dotenv').config()//Импорт файла .env
const sequelize = require('./db')//Импорт объекта с конфигурацией к БД
const cors = require('cors')//Импорт функции для отправки запросов с браузера
const fileUpload = require('express-fileupload')//Импорт модуля для получения файлов с сервера
const router = require('./routes/index')//Импорт главного роутера
const errorHandler = require('./middleware/ErrorHandlingMiddleware')//Импорт обработчика ошибок
const path = require('path')


const PORT = process.env.PORT || 5000//Из .env берём номер порта или ставим 5000

const app = express()//Объект express для запуска приложения

//Регистрация модулей
app.use(cors())
app.use(express.json())//express.json() нужен для парсинга json - формата
app.use(express.static(path.resolve(__dirname, 'static')))//Получаем доступ к файлам из папки static с клиента
app.use(fileUpload({}))
app.use('/api', router)///api - url для обработки router, импортированный router


//Обработка ошибок. Последний Middleware
app.use(errorHandler)

//Функция запуска 
const start = async () => {
    try {
        await sequelize.authenticate()//Подключение к базе данных
        await sequelize.sync()//Слияние состояния БД со схемой данных

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))//Слушаем порт
    } catch (e) {
        console.log(e)
    }
}

start()