const Router = require('express')
const router = new Router()
const { body } = require('express-validator') // Функция для валидации тела запроса

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/cleaners', checkRole('MANAGER'), userController.getCleaners);// Получение всех клинеров
router.get('/auth', authMiddleware, userController.check)
router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 8, max: 32 }), userController.registration)
router.post('/login', userController.login)
router.put('/', body('email').isEmail(), body('tel').isNumeric(), authMiddleware, userController.update)
router.post('/send_email', body('email').isEmail(), userController.sendRecoveryEmail)
router.post('/recover', body('code').isNumeric(), userController.checkRecoveryCode)
router.put('/change_password', body('password').isLength({ min: 8, max: 32 }), userController.changePassword)


module.exports = router