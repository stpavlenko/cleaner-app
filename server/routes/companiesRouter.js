const Router = require('express')
const router = new Router()
const companiesController = require('../controllers/companiesController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.put('/', checkRole('MANAGER'), companiesController.update)
router.get('/', checkRole('MANAGER'), companiesController.get)

module.exports = router