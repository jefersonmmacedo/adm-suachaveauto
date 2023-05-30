import axios from 'axios';

const buscaCNPJ = axios.create({
    baseURL: 'https://publica.cnpj.ws/cnpj/'
});

export default buscaCNPJ;