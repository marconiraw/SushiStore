import { $authHost, $host } from "./index";

export const addToBasket = async (dishId) => {
    const {data} = await $authHost.post('api/basket', dishId)
    return data
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

export const delFromBasket = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}

export const cleanBasket = async () => {
    const {data} = await $authHost.delete('api/basket')
    return data
}