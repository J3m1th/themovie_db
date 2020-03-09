import axios from "axios";

let baseUrl = 'https://api.themoviedb.org/3';
let apiKey = '?api_key=82d6c84c6df71390ae321d8b6c2f98ee';

export default {
    getMoviePage(movieId) {
        return axios.get(baseUrl + '/movie/' + movieId + apiKey);
    },

    getPopularMovies() {
        return axios.get(baseUrl + '/movie/popular' + apiKey);
    },

    getMovieSearchResults(query) {
        return axios.get(baseUrl + '/search/movie' + apiKey + '&query=' + query);
    },

    getGenreMovieList() {
        return axios.get(baseUrl + '/genre/movie/list' + apiKey);
    },
}