import axios from 'axios';

const buscaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default buscaCep;