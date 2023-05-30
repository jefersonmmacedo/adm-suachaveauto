import axios from 'axios';

const apiMail = axios.create({
baseURL: 'https://api-mail-private.herokuapp.com/'
});

export default apiMail;