const Router = require('express')
const router = new Router()
const messagesController = require('../controllers/messagesController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/', authMiddleware , messagesController.get)

module.exports = router