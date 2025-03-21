import axios from 'axios'
import { endpoints } from '../../../endpoints';
import { refreshAccessToken } from '../../../hooks/useRefreshToken';

const URL = process.env.REACT_APP_API_URL;


export const GetVendorBusiness = async () => {
    try {
        const newAccessToken = await refreshAccessToken();
        let vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
        vendorInfo = JSON.parse(vendorInfo);

        const response = await axios.get(`${URL + endpoints.business.get_vendor_business + vendorInfo?.vendor?.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newAccessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const AddVendorBusiness = async (data) => {
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
        const newAccessToken = await refreshAccessToken();
        const response = await axios.post(`${URL + endpoints?.business?.add_vendor_business}`, formData, {
            headers: {
                'Authorization': `Bearer ${newAccessToken}`,
            }
        });
        return response
    } catch (error) {
        console.log(error)
        return error
        // throw new Error(error);

    }
}