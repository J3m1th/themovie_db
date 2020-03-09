<template lang="pug">
	.container
		search-block(@refreshFavoriteArray="refreshFavoriteArray" :filteredMovies="filteredMovies" @initSearchOnParent='assignVariable')
		movies-block(@refreshFavoriteArray="refreshFavoriteArray" :popularMovies="popularMovies" :hidden="queryInnerInner" :page="getMoviePageById")
		.info-modal
			button.info-modal__btn(type="button" @click="showModal" title="Watch later list") ❤
			info-modal(v-show="isModalVisible" @close="closeModal" :refreshData="refreshableFavoriteMovieArray")
</template>

<script>

import {mapState} from 'vuex';
import {mapGetters} from "vuex";

import infoModal from '~/components/info-modal.vue';
import searchBlock from '~/components/movies/search-block.vue';
import moviesBlock from '~/components/movies/movies-block.vue';

export default {
	// async fetch({store}) {
	// 	if (!store.state.movies.listOfPopularMovies.length) await store.dispatch('movies/fetch');
	// 	// if (!store.state.movies.listOfFilteredMovies.length) await store.dispatch('movies/fetch2', this.queryInnerInner);
	// 	if (!store.state.movies.listOfFilteredMovies.length) await store.dispatch('movies/fetch2', 'marvel');
	// },

	components: {
		'search-block': searchBlock,
		'movies-block': moviesBlock,
		'info-modal': infoModal,
	},

	data() {
		return {
			queryInnerInner: '',
			isModalVisible: false,
			localStorageData: '',
			refreshableFavoriteMovieArray: []
		}
	},

	computed: {
		...mapGetters({
			getMoviePageById: 'movies/getMoviePageById',
			popularMovies: 'movies/popularMovies',
			filteredMovies: 'movies/filteredMovies',
			getGenreMovieList: 'movies/getGenreMovieList',
		}),
	},

	watch: {
		queryInnerInner(val) {
			if(this.queryInnerInner) {
				this.$store.dispatch('movies/fetch2', this.queryInnerInner);
			}
		},
	},

	mounted() {
		this.$store.dispatch('movies/fetch');
		this.$store.dispatch('movies/fetchMovieGenres');
	
		if(this.queryInnerInner) {
			this.$store.dispatch('movies/fetch2', this.queryInnerInner);
		}
	},

	methods: {
		refreshFavoriteArray( {favoriteMovies} ) {
			this.refreshableFavoriteMovieArray = favoriteMovies;
		},

		assignVariable( {queryInnerInnerInner} ) {
			this.queryInnerInner = queryInnerInnerInner;

			console.log(this.queryInnerInner)
		},

		showModal() {
			this.isModalVisible = true;
			document.documentElement.style.overflow = 'hidden';
		},
		 
		closeModal() {
			this.isModalVisible = false;
			document.documentElement.style.overflow = 'auto';
		},
	}
}

</script>

<style lang="scss" scoped>

.container {
	position: relative;
	min-height: 100vh;
	padding: 25px 20px 50px 20px;
}

.info-modal {
	position: absolute;
	top: 35px;
	right: 25px;
}

</style>

