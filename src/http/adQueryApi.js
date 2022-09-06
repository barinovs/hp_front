import {$authHost, $host} from '.'
import jwt_decode from 'jwt-decode'

export const getAdQueriesByUserId = async (userId) => {
    const response = await $authHost.get(`api/ad_query/${userId}`)
    const adQueries = await response.data
    return adQueries
}

export const getAllAdQueries = async () => {
    const response = await $authHost.get(`api/ad_query`)
    const adQueries = await response.data
    return adQueries
}

export const createAdQueryByAdmin = async (adQuery) => {
    const {data} = await $authHost.post(`api/ad_query`, adQuery)
    return data
}
