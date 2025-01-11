const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const companiesRouter = require('./companiesRouter')
const tasksRouter = require('./tasksRouter')
const reportsRouter = require('./reportsRouter')
const executionsRouter = require('./executionsRouter')
const messageRouter = require('./messagesRouter')


router.use('/user', userRouter)
router.use('/company', companiesRouter)
router.use('/tasks', tasksRouter)
router.use('/reports', reportsRouter)
router.use('/executions', executionsRouter)
router.use('/messages', messageRouter)

module.exports = router