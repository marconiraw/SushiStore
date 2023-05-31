const {BasketDish, Dish}=require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController{
    async addToBasket(req,res){
        const user = req.user
        let {dishId} = req.body
        const basket = await BasketDish.create({basketId : user.id, dishId : dishId})
        return res.json(basket)
    }

    async delFromBasket(req,res){
        const {id} = req.params
        const basket = await BasketDish.destroy({where:{id:id}})
        return res.json(basket)
    }

    async cleanBasket(req,res){
        const user = req.user
        const basket = await BasketDish.destroy({where:{basketId: user.id}})
    }

    async cleanBasketForOrder(req,res){
        const user = req
        const basket = await BasketDish.destroy({where:{basketId: user.id}})
    }

    async getBasketUser(req,res, next){
        const user = req.user

        const basket = await BasketDish.findAll({include: {
                    model: Dish
        }, where: {basketId: user.id}})

        return res.json(basket)
    }

    async getBasketForOrder(req,res, next){
        const user = req

        const basket = await BasketDish.findAll({include: {
                    model: Dish
        }, where: {basketId: user.id}})

        return basket
    }
}

module.exports=new BasketController()