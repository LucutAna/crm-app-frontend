import axios from "axios";
import token from "../token.json"

//add default header with authorization FIFAToken only for development mode
const setAuth = () => {
    let env = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    let FIFAToken = token.FIFAToken;
    return env ? {Authorization: `Bearer ${FIFAToken}`} : '';
};


const axiosInstance = axios.create({
    headers: {
        ...setAuth()
    }
});

export default axiosInstance;