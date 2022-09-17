import {$authHost, $host} from '.'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {
        email,
        password,
    })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {
        email,
        password,
    })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async (e) => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getAllUsers = async () => {
    const response = await $authHost.get('api/user/getAll')
    const users = await response.data
    return users
}

export const getTelegramId = async () => {
    const response = await $authHost.get('api/user/getTgId')
    const tgId = await response.data
    return tgId
}

export const getUserData = async (userId) => {
    const response = await $authHost.get(`api/user/${userId}`)
    const userData = await response.data
    return userData
}

export const updateTgId = async (userId, telegram_id) => {
    const response = await $authHost.post(`api/user/updateTgId`, {
        userId,
        telegram_id,
    })
    const result = await response.data
    return result
}
