<template lang="pug">
	section.search
		input.search__input(type='text' placeholder="search" v-model='queryInnerInnerInner' @keyup='initSearch')
		template(v-if="filteredMovies.results && queryInnerInnerInner")
			.search__container
				.desired-movie.search__desired-movie(v-for='(desiredMovie, index) in filteredMovies.results' :key='desiredMovie.id')
					favorites-button.desired-movie__favorites-button(@toggle-checkbox="toggleCheckboxOuter" @add-remove-movie="addRemoveMovie(index)" :checkPlease="isThisFilmInFavorite(desiredMovie)")
					nuxt-link(:to=" 'movies/movie/' + (desiredMovie.id) " no-prefetch)
						.text.desired-movie
							h3.text__title {{desiredMovie.title}}
							.text__genres
								p.text__genre(v-for="item in getGenreMovieListByIdArray(desiredMovie.genre_ids)") {{ item.name }}
							.text__date {{desiredMovie.release_date}}
						img.desired-movie__img(:src="desiredMovie.poster_path ? 'http://image.tmdb.org/t/p/w500/' + desiredMovie.poster_path : require('~/static/images/stub-img.png')")
</template>

<script>

import {mapGetters} from "vuex";
import favoritesButton from '~/components/favorites-button.vue';

export default {
	name: 'search-block',

	components: {
		'favorites-button': favoritesButton
	},

	props: ['page', 'filteredMovies'],

	data(){
		return{
			queryInnerInnerInner: '',
			results: '',
			favoriteMovies: [],
			newFavoriteMovie: null,
			checked: false,
		}
	},

	computed: {
		...mapGetters({
			getGenreMovieListByIdArray: 'movies/getGenreMovieListByIdArray',
		}),
	},

	mounted() {
		if (localStorage.getItem('favoriteMovies')) {
			try {
				this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
			} catch(e) {
				localStorage.removeItem('favoriteMovies');
			}
		};
	},

	updated() {
		this.setHeadersTitleMaxHeight();
	},

	methods: {
		initSearch() {
			this.$emit('initSearchOnParent', { queryInnerInnerInner: this.queryInnerInnerInner } );
		},

		isThisFilmInFavorite(item) {
			return !!this.favoriteMovies.find(element => element.id == item.id);
		},

		toggleCheckboxOuter( {checked} ) {
			this.checked = checked;
		},	
		
		addRemoveMovie(index) {
			if(this.checked) {
				this.favoriteMovies.push(
					{
						id : this.filteredMovies.results[index].id,
						title : this.filteredMovies.results[index].title,
						img : this.filteredMovies.results[index].poster_path,
					},
				);
			} else {
				this.favoriteMovies = this.favoriteMovies.filter(fm => fm.id !== this.filteredMovies.results[index].id);
			}

			this.saveMovies();
		},
		
		saveMovies() {
			const parsed = JSON.stringify(this.favoriteMovies);
			localStorage.setItem('favoriteMovies', parsed);

			this.$emit('refreshFavoriteArray', {favoriteMovies: this.favoriteMovies});
		},

		setHeadersTitleMaxHeight() {
			const tabsHeadSelectors = document.querySelectorAll('.text__title');
			const tabsGenresSelectors = document.querySelectorAll('.text__genres');

			let maxHeadHeight = 0;

			tabsHeadSelectors.forEach(el => {
				if (el.style.removeProperty) {
					el.style.removeProperty('height');
				} else {
					el.style.removeAttribute('height');
				}
			});

			tabsHeadSelectors.forEach(selector => {
				if (selector.offsetHeight > maxHeadHeight) {
					maxHeadHeight = selector.offsetHeight;
				} 
			});

			tabsHeadSelectors.forEach(selector => {
				selector.style.height = maxHeadHeight + 'px';
			});

			// for genres
			tabsGenresSelectors.forEach(el => {
				if (el.style.removeProperty) {
					el.style.removeProperty('height');
				} else {
					el.style.removeAttribute('height');
				}
			});

			tabsGenresSelectors.forEach(selector => {
				if (selector.offsetHeight > maxHeadHeight) {
					maxHeadHeight = selector.offsetHeight;
				} 
			});

			tabsGenresSelectors.forEach(selector => {
				selector.style.height = maxHeadHeight + 'px';
			});
		}
	}
}

</script>

<style lang="scss" scoped>

.search {
	&__container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		justify-items: center;
		grid-gap: 50px 20px;
	}
	&__input {
		display: block;
		width: calc(100% - 100px);
		padding: 10px;
		margin: 0 auto 50px auto;
		border: 1px solid #49c5b6;
		border-radius: 10px;
		background-color: transparent;
	}
	
}

.desired-movie {
	position: relative;
	max-width: 250px;
	&__favorites-button {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}
	
	&__img {
		display: block;
		width: 250px;
		height: auto;
		object-fit: cover;
		transition: transform .5s ease;
		&:hover {
			transform: scale(1.1);
		}
	}
}

.text {
	padding-right: 50px;
	&__title {
		margin-bottom: 15px;
		font-family: "Montserrat", sans-serif;
	}
	&__genres {
		margin-bottom: 10px;
	}
	&__genre {
		display: inline-block;
		margin-right: 5px;
		margin-bottom: 5px;
		font-weight: 300;
	}
	&__date {
		margin-bottom: 20px;
		font-family: "Montserrat", sans-serif;
	}
}

</style>




