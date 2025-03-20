import { useState, useCallback } from 'react';
import axios from 'axios';

const refreshEndpoint = `${process.env.REACT_APP_API_URL}auth/refresh/`;

export const useRefreshToken = () => {
    const [refresherror, setError] = useState(null);

    const refreshAccessToken = useCallback(async () => {
        try {
            // Get vendor info from localStorage
            let vendorInfo = localStorage.getItem('vendorInfo');
            if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
            vendorInfo = JSON.parse(vendorInfo);

            const response = await axios.post(refreshEndpoint, {
                refresh: vendorInfo.refresh_token,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });



            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = response.data;
            // Update localStorage with new tokens if provided
            if (data.access) {
                vendorInfo.access_token = data.access;
                if (data.refresh_token) {
                    vendorInfo.refresh_token = data.refresh_token;
                }
                localStorage.setItem('vendorInfo', JSON.stringify(vendorInfo));
            }

            return data.access; // Return the new access token
        } catch (err) {
            setError(err.message);
            console.error('Error refreshing token:', err);
            return null; // Return null on error
        }
    }, []);

    return { refreshAccessToken, refresherror };
};


export const refreshAccessToken = async () => {
    try {
        // Get vendor info from localStorage
        let vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
        vendorInfo = JSON.parse(vendorInfo);

        // Make API call to refresh token

        const response = await axios.post(refreshEndpoint, {
            refresh: vendorInfo.refresh_token,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });


        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;
        // console.log(response, "find it here")
        // Update localStorage with new tokens if provided
        if (data.access) {
            vendorInfo.access_token = data.access;
            if (data.refresh_token) {
                vendorInfo.refresh_token = data.refresh_token;
            }
            localStorage.setItem('vendorInfo', JSON.stringify(vendorInfo));
        }

        return data.access; // Return the new access token
    } catch (err) {
        console.error('Error refreshing token:', err);
        return null; // Return null if there's an error
    }
};