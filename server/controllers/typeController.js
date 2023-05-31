const {Type, Dish}=require('../models/models')
const ApiError=require('../error/ApiError')


class TypeController{
    async create (req, res){
        const {name}=req.body
        const type=await Type.create({name})
        return res.json(type)
    }

    async getAll (req, res){
        const types = await Type.findAll()
        return res.json(types)
    }

    async change (req, res){
        const {id}=req.params
        const {name}=req.body
        const type=await Type.update({name: name}, {where :{id:id}})
        return res.json(type)
    }


    async remove (req, res){
        const {id}=req.params
        const type=await Type.destroy({where:{id:id}})
        const dish=await Dish.destroy({where:{typeId:id}})
        const dishNull=await Dish.destroy({where:{typeId:null}})
        return res.json(type, dish, dishNull)
    }
}

module.exports=new TypeController()