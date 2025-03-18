import axios from 'axios'
import { endpoints } from '../../../endpoints';

const URL = process.env.REACT_APP_API_URL;

export const AddBanners = async (data) => {
    try {
        let formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) { // Only append non-null values
                formData.append(key, value);
            }
        });
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await axios.post(`${URL + endpoints?.banners?.add_banners}`, formData)
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const GetBanners = async () => {
    try {
        const response = await axios.get(`${URL + endpoints?.banners?.get_banners}`)
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
