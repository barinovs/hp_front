import {$host} from '.'

export const getAllCarMarks = async (q) => {
    const response = await $host.get(`api/car_mark`, {
        // params: {q},
    })
    return response.data
}

export const getCarModels = async (carMarkId) => {
    const response = await $host.get(`api/car_mark/getModels`, {
        params: {carMarkId},
    })
    return response.data
}
