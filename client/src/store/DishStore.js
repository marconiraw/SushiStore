import {makeAutoObservable} from "mobx";

export default class DishStore{
    constructor(){
        this._types = []
        this._dishes=[]
        this._baskets = []
        

        this._selectedType = {}

        this._page = 1
        this._totalCount = 0
        this._limit = 9

        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }

    setDishes(dishes){
        this._dishes = dishes
    }

    setSelectedType(type){
        this.setPage(1)

        if (this._selectedType === type){
            this._selectedType = {}
        } else {
            this._selectedType = type
        }
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

    
    setBaskets(basket){
        this._baskets = basket
    }

    get basket() {
        return this._baskets
    }


    get types() {
        return this._types
    }

    get dishes(){
        return this._dishes
    }

    get selectedType(){
        return this._selectedType
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