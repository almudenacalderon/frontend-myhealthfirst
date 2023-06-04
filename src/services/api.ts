import axios from 'axios';

const URL_API="http://localhost:7198/api"

const api = axios.create({
    baseURL: URL_API,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
export default api;