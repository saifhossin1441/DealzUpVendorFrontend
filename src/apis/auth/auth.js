import axios from 'axios'
export const login = () =>{
    try {
        const response = axios.post(`${process.env.REACT_APP_API_URL + endpoints?.auth.login_vendor}`)
        return response
    } catch (error) {
        return error
    }
}