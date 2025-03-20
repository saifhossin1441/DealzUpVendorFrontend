import axios from "axios";
import { endpoints } from '../../../endpoints';
import { refreshAccessToken } from "../../../hooks/useRefreshToken";


const URL = process.env.REACT_APP_API_URL;

export const GetUsage = async () => {
    try {
        const response = await axios.get(`${URL + endpoints?.offers?.get_offers}`)
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const GetSubscriptionDetails = async () => {
    try {
        const newAccessToken = await refreshAccessToken();
        const response = await axios.get(`${URL + endpoints?.subscription?.get_subscription_details}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newAccessToken}`,
            },
        })
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const UpgradeSubscription = async (data) => {
    try {
        const newAccessToken = await refreshAccessToken();
        const response = await axios.post(`${URL + endpoints?.subscription?.upgrade_subsription}`, data, {
            headers: {
                'Authorization': `Bearer ${newAccessToken}`,
            }
        })
        // if (response.status !== 200) {
        //     throw new Error(`Unexpected status code: ${response.status}`);
        // }
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}