import axios from 'axios';

const buscaCepPortugal = axios.create({
    baseURL: 'https://api.duminio.com/ptcp/v2/ptapi62bb0c790a9095.46284095/'
});

export default buscaCepPortugal;