import axios from 'axios';

const apiFipe = axios.create({
  baseURL: 'https://api.placafipe.xyz'
});

export default apiFipe;