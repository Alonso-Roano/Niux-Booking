import axios from 'axios';

const niuxApi = axios.create({
    baseURL: 'https://localhost:7044/api',
});



export { niuxApi };