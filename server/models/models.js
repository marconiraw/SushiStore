const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    paytype: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING}
})

const OrderDish = sequelize.define('order_dish',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const BasketDish = sequelize.define('basket_dish',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const Dish = sequelize.define('dish',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false},
    price: {type: DataTypes.INTEGER, allowNull:false},
    img: {type: DataTypes.STRING, allowNull:false},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false},
})

const DishInfo = sequelize.define('dish_info',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderDish)
OrderDish.belongsTo(Order)

Dish.hasMany(OrderDish)
OrderDish.belongsTo(Dish)

Basket.hasMany(BasketDish)
BasketDish.belongsTo(Basket)

Type.hasMany(Dish)
Dish.belongsTo(Type)

Dish.hasMany(BasketDish)
BasketDish.belongsTo(Dish)

Dish.hasMany(DishInfo, {as: 'info'})
DishInfo.belongsTo(Dish)

module.exports = {
    User,
    Basket,
    BasketDish,
    Dish,
    DishInfo,
    Type,
    Order,
    OrderDish
}