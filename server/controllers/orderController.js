const { Order, Dish, OrderDish } = require('../models/models')
const ApiError = require('../error/ApiError')
const { getBasketForOrder, cleanBasketForOrder } = require('./basketController')

class OrderController{
    async getOrder (req, res, next){
        try{

            const user = req.user

            const countAll = await Order.count()
            const countOne = await Order.count({where: {userId: user.id}})
            

            let {limit, page} = req.query
            let limitAll = limit
            let limitOne = limit

            let offsetAll = (countAll) - page * limitAll
            let offsetOne = (countOne) - page * limitOne

            if (offsetAll < 0){
                if (countAll > limitAll) {
                    offsetAll = 0
                    limitAll = countAll - limitAll * (page - 1)
                } else {
                    offsetAll = 0
                    limitAll = countAll
                } 
            }

            if (offsetOne < 0){
                if (countOne > limit) {
                    offsetOne = 0
                    limitOne = countOne - limitOne * (page - 1)
                } else {
                    offsetOne = 0
                    limitOne = countOne
                } 
            }

            const [oneUser, allUsers] = await Promise.all(
                [
                    await Order.findAndCountAll({
                        where: {userId: user.id}, 
                        order: [['id', 'ASC']],
                        limit: limitOne, 
                        offset: offsetOne
                    }),
                    await Order.findAndCountAll({ 
                        order: [['id', 'ASC']],
                        limit: limitAll, 
                        offset: offsetAll,
                    })
                ]
            )

            oneUser.rows.sort(function(a, b){return b.id - a.id})
            allUsers.rows.sort(function(a, b){return b.id - a.id})
            return res.json({oneUser, allUsers})
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOneInfo (req, res, next){
        try{
            const {id} = req.params

            const [order, orderInfo] = await Promise.all([
                Order.findOne({where: {id : id}}),
                OrderDish.findAll({
                   include: { model: Dish },
                   where: {orderId: id},
                })
              ]);
           
              return res.json({ order, orderInfo });
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async createOrder (req, res, next){
        try{
            const user = req.user

            let {name,phone,address,paytype}=req.body

            const order = await Order.create({
                userId: user.id, 
                phone: phone, 
                name: name, 
                address: address, 
                paytype: paytype, 
                status: 'Нове'
            })
            const basket = await getBasketForOrder(user)
            
            await basket.map(dish => {
                OrderDish.create({orderId: order.id, dishId: dish.dishId})
            })

            await cleanBasketForOrder(user)

            return res.json(order)

        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async changeStatus (req, res, next){
        try{
            const {id} = req.params

            const {status}=req.body

            const order = await Order.update({status: status}, {where: {id:id}})

            return res.json(order)

        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async delOrder (req, res, next){
        try{
            const {id} = req.params

            const orderDish = await OrderDish.destroy({where: {orderId: id}})
            const order = await Order.destroy({where: {id: id}})

            return res.json({orderDish, order})
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports=new OrderController()