import axios from 'axios';

const apiIpUser = axios.create({
   baseURL: 'https://api.ipify.org?format=json/'
});

export default apiIpUser;