import axios from 'axios';
import { URL_API } from "../utils/constants";

const api = axios.create({
    baseURL: URL_API,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
export default api;