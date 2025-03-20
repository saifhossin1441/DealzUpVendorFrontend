import axios from 'axios';
import { refreshAccessToken } from '../../../hooks/useRefreshToken';
import { endpoints } from '../../../endpoints';
const URL = process.env.REACT_APP_API_URL;

export const fetchData = async () => {

    try {
        // Refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Helper function to make GET requests with axios
        const fetchWithAuth = async (url) => {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newAccessToken}`,
                },
            });
            return response.data;  // Returning the response data
        };

        // Get vendorInfo from localStorage
        let vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
        vendorInfo = JSON.parse(vendorInfo);
        if (!vendorInfo?.vendor?.id) throw new Error('Vendor ID not found in vendorInfo');

        // Fetch the data using axios
        const businessData = fetchWithAuth(`${URL + endpoints.business.get_vendor_business + vendorInfo?.vendor?.id}`);
        const categoriesData = fetchWithAuth(`${URL + endpoints.categories.get_categories}`);
        const subcategoriesData = fetchWithAuth(`${URL + endpoints.categories.get_subcategories}`);

        // Wait for all the data to be fetched simultaneously
        const [business, categories, subcategories] = await Promise.all([businessData, categoriesData, subcategoriesData]);

        return { business, categories, subcategories };  // Returning the data in a single object

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // Ensure the error is thrown for React Query to handle it
    }
};
