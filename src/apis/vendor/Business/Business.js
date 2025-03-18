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