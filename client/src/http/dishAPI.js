import { $authHost, $host } from "./index";

export const createDish = async (dish) => {
    const {data} = await $authHost.post('api/dish', dish)
    return data
}

export const changeDish = async (dish, id) => {
    const {data} = await $authHost.put('api/dish/' + id, dish)
    return data
}

export const removeDish = async (id) => {
    const {data} = await $authHost.delete('api/dish/' + id)
    return data
}

export const fetchDishes = async (typeId, page, limit) => {
    const {data} = await $host.get('api/dish', {params:{
        typeId, page, limit
    }})
    return data
}

export const fetchOneDish = async (id) => {
    const {data} = await $host.get('api/dish/'+id)
    return data
}