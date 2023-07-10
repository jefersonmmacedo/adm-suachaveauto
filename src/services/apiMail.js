import axios from 'axios';

const apiMail = axios.create({
baseURL: 'https://api-mail-private-suachaveauto-cf767b1333b7.herokuapp.com/'
});

export default apiMail;