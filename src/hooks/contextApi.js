import React, { createContext, useEffect, useState } from 'react';
import { useRefreshToken } from './useRefreshToken';
import axios from 'axios';

// Create a Context
const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [businessData, setBusinessData] = useState(null);
    const [value, setValue] = useState("");
    const { refreshAccessToken, refresherror } = useRefreshToken();



    const GetApi = async () => {
        const newAccessToken = await refreshAccessToken();
        console.log(newAccessToken, 'refresh token', refresherror);

        let vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) return;
        vendorInfo = JSON.parse(vendorInfo);
        if (!vendorInfo?.vendor?.id) return;

        const apiEndpoint = `${process.env.REACT_APP_API_URL}vendor/businesses/vendor/${vendorInfo?.vendor?.id}`;

        try {
            const response = await axios.get(apiEndpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newAccessToken}`,
                },
            });
            console.log(response)
            // Assuming the response data is in response.data
            setBusinessData(response.data);
        } catch (error) {
            console.error('Error fetching the business:', error);
        }
    }
    useEffect(() => {
        GetApi()
    }, [refreshAccessToken, refresherror])



    return (
        <MyContext.Provider value={{ value, setValue, businessData, GetApi }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
