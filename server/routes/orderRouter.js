const Router = require('express')
const router = new Router()

const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware , orderController.getOrder)
router.get('/:id', orderController.getOneInfo)
router.post('/', authMiddleware , orderController.createOrder)
router.put('/:id', orderController.changeStatus)
router.delete('/:id', orderController.delOrder)


module.exports = router