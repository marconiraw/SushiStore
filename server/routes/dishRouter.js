const Router = require('express')

const dishController = require('../controllers/dishController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/',  checkRole('ADMIN'), dishController.create)
router.put('/:id', checkRole('ADMIN'), dishController.change)
router.delete('/:id', checkRole('ADMIN'), dishController.remove)
router.get('/', dishController.getAll)
router.get('/:id', dishController.getOne)

module.exports = router