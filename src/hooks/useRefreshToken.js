import { useState, useCallback } from 'react';

const refreshEndpoint = `${process.env.REACT_APP_API_URL}auth/refresh/`;

export const useRefreshToken = () => {
    const [refresherror, setError] = useState(null);

    const refreshAccessToken = useCallback(async () => {
        try {
            // Get vendor info from localStorage
            let vendorInfo = localStorage.getItem('vendorInfo');
            if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
            vendorInfo = JSON.parse(vendorInfo);

            // Make API call to refresh token
            const response = await fetch(refreshEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: vendorInfo.refresh_token }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data, "find it here")
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
