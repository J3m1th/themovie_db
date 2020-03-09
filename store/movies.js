import $api from '~/api/api.js';

export const state = () => ({
    listOfPopularMovies: [],
    listOfFilteredMovies: [],
    moviePage: [],
    genreMovieList: [],
})

export const mutations = {
    setPopularMovies(state, payload) {
        state.listOfPopularMovies = payload;
    },

    setFilteredMovies(state, payload) {
        state.listOfFilteredMovies = payload;
    },

    setMoviePage(state, payload) {
        state.moviePage = payload;
    },

    setMovieGenres(state, payload) {
        state.genreMovieList = payload;
    }
}

export const getters = {
    popularMovies: state => {
        return state.listOfPopularMovies;
    },

    filteredMovies: state => {
        return state.listOfFilteredMovies;
    },

    getMoviePageById: state => {
        return state.moviePage;
    },

    getGenreMovieList: state => {
        return state.genreMovieList;
    },

    getGenreMovieListByIdArray: state => arr => {
        return state.genreMovieList.genres.filter((item) => {
            return arr.find((el) => item.id == el);
        });
    },
}

export const actions = {
    async fetch({ commit }) {
        const { data } = await $api.getPopularMovies();
        commit('setPopularMovies', data);
    },

    async fetch2({ commit }, queryInner) {
        const { data } = await $api.getMovieSearchResults(queryInner);
        commit('setFilteredMovies', data);
    },

    async fetchMoviePage({ commit }, movieId) {
        const { data } = await $api.getMoviePage(movieId);
        commit('setMoviePage', data);
    },

    async fetchMovieGenres({ commit }) {
        const { data } = await $api.getGenreMovieList();
        commit('setMovieGenres', data);
    }
}