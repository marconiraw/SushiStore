const uuid = require('uuid')
const path = require('path')
const {Dish, DishInfo, BasketDish} = require('../models/models')
const ApiError = require('../error/ApiError')
const { unlink } = require('node:fs/promises');

class DishController{
    async remove (req, res, next){
        try{
            const {id} = req.params

            const dish = await Dish.findOne({where: {id}})

            const filePath = path.resolve(__dirname, '..', 'static', dish.img)
            await unlink(filePath)

            const dishInfoRemove = await DishInfo.destroy({where:{dishId:id}})
            const dishInfoRemoveisNull = await DishInfo.destroy({where:{dishId:null}})
            const dishRemove = await Dish.destroy({where:{id:id}})
            const basket = await BasketDish.destroy({where:{dishId:id}})
            const basketNull = await BasketDish.destroy({where:{dishId: null}})

            return res.json(dishRemove, basket, basketNull)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async change (req, res, next){
        try {
            const {id} = req.params
            let {name,price,typeId,info}=req.body
            const {img} = req.files

            const imgDish = await Dish.findOne({where: {id}})

            const filePath = path.resolve(__dirname, '..', 'static', imgDish.img)
            await unlink(filePath)
            
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            let updImg = fileName
    
            const dish = await Dish.update({name: name, price: price, typeId: typeId, img : updImg}, {where: {id:id}});

            if (info){
                info = JSON.parse(info)
                info.forEach(i=>
                    DishInfo.update({
                        title: i.title,
                        description: i.description,
                        dishId: dish.id
                    }, {where: {id:id}})
                )
            }
            return res.json(dish)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create (req, res, next){
        try {
            let {name,price,typeId,info}=req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const dish = await Dish.create({name, price, typeId, img: fileName});

            if (info){
                info = JSON.parse(info)
                info.forEach(i=>
                    DishInfo.create({
                        title: i.title,
                        description: i.description,
                        dishId: dish.id
                    })
                )
            }
            return res.json(dish)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res){
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let dishes;
        if (!typeId){
            dishes = await Dish.findAndCountAll({limit, offset, order:[['id', 'ASC']]})
        }
        if (typeId){
            dishes = await Dish.findAndCountAll({where:{typeId}, limit, offset})
        }
        return res.json(dishes)
    }

    async getOne (req, res){
        const {id} = req.params
        const dish = await Dish.findOne(
            {
                where: {id},
                include: [{model: DishInfo, as: 'info'}]
            },
        )
        return res.json(dish)
    }
}

module.exports=new DishController()