import {makeAutoObservable} from "mobx";

export default class OrderStore{
    constructor(){
        this._allOrders = []
        this._oneOrder = []
        this._dishes = []

        this._page = 1
        this._limit = 3
        this._totalCount = 0

        makeAutoObservable(this)
    }

    setAllOrders(allOrders){
        this._allOrders = allOrders
    }

    setDishes(dishes){
        this._dishes = dishes
    }

    setOneOrder(oneOrder){
        this._oneOrder = oneOrder
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(count){
        this._totalCount = count
    }

    setLimit(limit){
        this._limit = limit
    }

    get allOrders() {
        return this._allOrders
    }

    get dishes() {
        return this._dishes
    }

    get oneOrder(){
        return this._oneOrder
    }

    get page(){
        return this._page
    }

    get totalCount(){
        return this._totalCount
    }

    get limit(){
        return this._limit
    }
}