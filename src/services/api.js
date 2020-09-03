import axios from 'axios';

const BASE_URL = 'http://gateway.marvel.com';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;