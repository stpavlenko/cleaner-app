const Router = require('express')
const router = new Router()
const tasksController = require('../controllers/tasksController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('MANAGER'), tasksController.create)
router.put('/', checkRole('MANAGER'), tasksController.update)
router.get('/', checkRole('MANAGER') , tasksController.get)
router.delete('/', checkRole('MANAGER'), tasksController.delete)

module.exports = router