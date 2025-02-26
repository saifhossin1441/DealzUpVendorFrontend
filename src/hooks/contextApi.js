import React, { createContext, useEffect, useState } from 'react';
import { useRefreshToken } from './useRefreshToken';

// Create a Context
const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [businessData, setBusinessData] = useState(null);
    const [value, setValue] = useState("");
    const { refreshAccessToken, refresherror } = useRefreshToken();



    const GetApi = async () => {
        const newAccessToken = await refreshAccessToken();
        console.log(newAccessToken, 'refresh token', refresherror)
        let vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) return
        vendorInfo = JSON.parse(vendorInfo);
        if (!vendorInfo?.vendor?.id) return

        const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/businesses/vendor/${vendorInfo?.vendor?.id}`;
        fetch(apiEndpoint, {
            method: 'GET',
            // mode: 'no-cors',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newAccessToken}`,
            },
        }).then((response) => response.json())
            .then((data) => {

                console.log(data, "isthis array i need")
                setBusinessData(data)
            })
            .catch((error) => {
                console.error('Error fetching the bussiness:', error);
            });
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
