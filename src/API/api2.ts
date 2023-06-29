import axios from 'axios';

const options = {
    method: 'GET',
    baseURL: 'https://movies-tv-shows-database.p.rapidapi.com/',
    params: {page: '1'},
    headers: {
        Type: 'get-trending-movies',
        'X-RapidAPI-Key': '4a4a721ffamsh95b7e4b3a5d75a5p1aa010jsnf31c84a2b7fb',
        'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
    }
};

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
// } catch (error) {
//     console.error(error);
// }

export const getFilms = () => {
    return axios.request(options)
}