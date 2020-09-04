import axios from 'axios';
import md5 from 'md5';

const API      = process.env.REACT_APP_API_KEY;
const TS       = process.env.REACT_APP_TIMESTAMP;
const PRIV_KEY = process.env.REACT_APP_PRIVATE_KEY;
const HASH     = md5(TS+PRIV_KEY+API);

const BASE_URL = 'http://gateway.marvel.com';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey : API,
        hash   : HASH,
        ts     : TS
    }
});

export default api;