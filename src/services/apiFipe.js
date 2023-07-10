import axios from 'axios';

const apiFipe = axios.create({
  baseURL: 'https://api-fipe-placa-suachaveauto-2194f08cc15b.herokuapp.com'
});

export default apiFipe;