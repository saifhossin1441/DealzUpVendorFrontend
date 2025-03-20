import axios from 'axios'
import { endpoints } from '../../endpoints'

const URL = process.env.REACT_APP_API_URL;

export const login = async (data) => {
    try {
        const response = await axios.post(`${URL + endpoints?.userauth?.login}`, data)
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const register = async (data) => {
    try {
        const response = await axios.post(`${URL + endpoints?.userauth?.register}`, data)
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}