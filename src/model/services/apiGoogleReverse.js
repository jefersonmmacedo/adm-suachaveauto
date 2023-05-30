import axios from 'axios';

const apiGoogleReverse = axios.create({
baseURL: 'https://maps.googleapis.com/maps/api/geocode/'
});

export default apiGoogleReverse;



