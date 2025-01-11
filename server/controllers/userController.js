const uuid = require('uuid')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const { validationResult } = require('express-validator')//Функция для получения результатов валидации


const { Users, Companies } = require('../models/models')
const ApiError = require('../exeptions/ApiError')
const MailService = require('../service/mailService')
const UserDto = require('../dtos/userDto')

//Функция генераии JWT - токена
const generateJwt = (payload) => {
    return jwt.sign(
        payload,
        process.env.SECRET_KEY, //Секретный ключ
        { expiresIn: "24h" } //Время жизни токена
    );
};

class UserController {

    async registration(req, res, next) {
        //Регистрация
        try {
            const errors = validationResult(req)//Передаём тело запроса
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            const { email, password, role } = req.body; //Берём данные из тела запроса к серверу
            const is_email = await Users.findOne({ where: { email, role } }); //Проверяем существует ли email
            if (is_email) {
                return next(
                    ApiError.BadRequest("Пользователь с таким email уже существует!")
                );
            }
            const hashPassword = await bcrypt.hash(password, 5); //Хешируем пароль
            //Создаём пользователя в БД
            const user = await Users.create({
                email,
                password: hashPassword,
                role
            });
            // Создание компании пользователя, если пльзователь - менеджер
            if (role == "MANAGER") {
                await Companies.create({ userId: user.id })
            }
            //Генерация JWT - токена.
            let userDto = new UserDto(user)
            const token = generateJwt({ ...userDto });
            return res.json({ token }); //Возвращаем сгенерированный токен на клиент
        } catch (e) {
            console.log(e);
        }
    }


    async login(req, res, next) {
        try {
            const { email, password, role } = req.body;//Из тела зпроса вытаскиваем данные 
            const user = await Users.findOne({ where: { email, role } })
            if (!user) {
                throw ApiError.BadRequest('Пользователь с таким email не найден')
            }
            const isPassEquals = await bcrypt.compare(password, user.password);//2 параметр - пароль из бд
            if (!isPassEquals) {
                throw ApiError.BadRequest('Неверный пароль')
            }
            const userDto = new UserDto(user)//Генерируем новый Dto
            const token = generateJwt({ ...userDto })
            return res.json({ token })
        } catch (e) { next(e) }
    }

    async update(req, res, next) {
        const { email, tel, fio } = req.body
        const id = req.user.id
        const role = req.user.role
        let fileName;
        const user = await Users.findOne({ where: { id, role } })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        if (req.files && req.files.photo) {
            const { photo } = req.files;
            if (user.photo) {
                fs.unlink(path.resolve(__dirname, "..", "static", user.photo), (err) => {
                    console.log(err);
                });
            }
            fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static', fileName))
            user.set({ email, tel, fio, photo: fileName })
        } else {
            user.set({ email, tel, fio })
        }
        user.save()
        let userDto = new UserDto(user)
        const token = generateJwt({ ...userDto })
        return res.json({ token }).status(200)
    }

    async check(req, res, next) {
        try {
            let model = {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role,
                fio: req.user.fio,
                tel: req.user.tel,
                photo: req.user.photo,
            }
            const token = generateJwt(model);
            return res.json({ token });
        } catch (e) {
            console.log(e);
        }
    }

    // Функция получения всех пользователей с ролью "CLEANER"
    async getCleaners(req, res, next) {
        try {
            const users = await Users.findAll({ where: { role: "CLEANER" } });
            res.json(users);
        } catch (e) { next(e) }
    }

    // Обработка кода восстановления
    async checkRecoveryCode(req, res, next) {
        try {
            const { email, code, role } = req.body
            const user = await Users.findOne({ where: { email, recoveryCode: code, role } })
            if (!user) {
                throw ApiError.BadRequest('Неверный код')
            }
            user.set({
                recoveryCode: null
            })
            user.save();
            res.json({ message: "OK" })
        } catch (e) { next(e) }
    }

    async sendRecoveryEmail(req, res, next) {
        try {
            const { email, role } = req.body
            const user = await Users.findOne({ where: { email, role } })
            if (!user) {
                return next(ApiError.BadRequest('Пользователь c такими данными не найден.'))
            }
            const code = await MailService.sendCode(email)
            user.set({
                recoveryCode: code
            })
            await user.save()
            res.json({ message: "OK" })
        } catch (e) {
            next(e)
        }
    }

    async changePassword(req, res, next) {
        const { email, role, password } = req.body
        const user = await Users.findOne({ where: { email, role } })
        if (!user) {
            return next(ApiError.BadRequest('Пользователь c такими данными не найден.'))
        }
        const hashPassword = await bcrypt.hash(password, 3)
        user.set({
            password: hashPassword
        })
        await user.save()
        return res.json({ message: "Пароль изменён." })
    }
}


module.exports = new UserController()