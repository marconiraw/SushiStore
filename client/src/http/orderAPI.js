import { $authHost } from "./index";

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order', order)
    
    return data
}

export const getOrder = async (page, limit) => {
    const {data} = await $authHost.get('api/order', {params:{page, limit}})
    return data
}

export const getOneOrderInfo = async (id) => {
    const {data} = await $authHost.get('api/order/' + id)
    return data
}

export const changeStatus = async (id, status) => {
    const {data} = await $authHost.put('api/order/' + id, {status})
    return data
}

export const delOrder = async (id) => {
    const {data} = await $authHost.delete('api/order/' + id)
    return data
}
