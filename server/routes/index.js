const Router = require('express')
const router = new Router()

const dishRouter = require('./dishRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')


router.use('/dish',dishRouter)
router.use('/type',typeRouter)
router.use('/user',userRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)

module.exports = router