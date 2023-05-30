import axios from 'axios';

const apiInstagram = axios.create({
baseURL: 'https://www.instagram.com/'
});

export default apiInstagram;
