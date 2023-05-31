const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware , basketController.getBasketUser)
router.get('/' , basketController.getBasketForOrder)
router.post('/', authMiddleware , basketController.addToBasket)
router.delete('/:id', authMiddleware , basketController.delFromBasket)
router.delete('/', authMiddleware , basketController.cleanBasket)


module.exports = router