const Router = require('express')
const router = new Router()
const reportsController = require('../controllers/reportsController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('MANAGER'), reportsController.create)
router.get('/', checkRole('MANAGER') , reportsController.get)
router.delete('/', checkRole('MANAGER'), reportsController.delete)

module.exports = router