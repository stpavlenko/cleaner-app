const Router = require('express')
const router = new Router()
const executionsController = require('../controllers/executionsController')
const authMiddleware = require('../middleware/authMiddleware')

router.put('/', authMiddleware, executionsController.update)
router.get('/', authMiddleware , executionsController.get)
router.get('/download', authMiddleware, executionsController.download)

module.exports = router