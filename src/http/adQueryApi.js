import {$authHost, $host, $avitoHost} from '.'
import jwt_decode from 'jwt-decode'

export const getAdQueriesByUserId = async (userId, page, limit) => {
    const response = await $authHost.get(`api/ad_query/${userId}`, {
        params: {page, limit},
    })
    const adQueries = await response.data
    return adQueries
}

export const getAllAdQueries = async (page, limit = 5) => {
    const response = await $authHost.get(`api/ad_query`, {
        params: {page, limit},
    })
    const adQueries = await response.data
    return adQueries
}

export const createAdQueryByAdmin = async (adQuery) => {
    const {data} = await $authHost.post(`api/ad_query`, adQuery)
    return data
}

export const setActive = async (data) => {
    const {res} = await $authHost.post(`api/ad_query/setActive`, data)
    return res
}

export const deleteAdQuery = async (data) => {
    const {res} = await $authHost.post(`api/ad_query/delete`, data)
    return res
}

export const getAvitoLocations = async (q) => {
    const response = await $host.get(`api/ad_query/getAvitoLocations`, {
        params: {q},
    })
    return response
}
