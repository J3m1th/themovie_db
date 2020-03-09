<template lang="pug">
	section.movies
		template(v-if="!hidden")
			h2.movies__title Popular movies
			.movies__container(v-lazy-load)
				.movie.movies__item(v-for="(movie, index) in popularMovies.results" :key="movie.id")
					favorites-button.movie__favorites-button(@toggle-checkbox="toggleCheckboxOuter" @add-remove-movie="addRemoveMovie(index)" :checkPlease="isThisFilmInFavorite(movie)")
					nuxt-link(:to=" 'movies/movie/' + (movie.id) " no-prefetch)
						.text.movie__text
							h3.text__title {{movie.title}}
							.text__genres(v-for="genre in movie.genres" :key="genre.id")
								.text__genre {{genre.name}}
							.text__date {{movie.release_date}}
						img.movie__img(:src="movie.poster_path ? 'http://image.tmdb.org/t/p/w500/' + movie.poster_path : require('~/static/images/stub-img.png')")
</template>

<script>

import favoritesButton from '~/components/favorites-button.vue';

export default {
	name: 'movies-block',

	components: {
		'favorites-button': favoritesButton
	},

	props: ['page', 'popularMovies', 'hidden', 'genreMovieList'],

	data() {
		return {
			valueInner: false,
			favoriteMovies: [],
			newFavoriteMovie: null,
			movieId: ''
		}
	},

	computed: {
		// movieGenre() {
		// 	return this.genreMovieList.genres.filter(el => el.id === this.movieId);
		// }
	},

	mounted() {
		console.log('movie genres in movies-block')
		console.log(this.genreMovieList)

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
		isThisFilmInFavorite(item) {
			return !!this.favoriteMovies.find(element => element.id == item.id);
		},

		toggleCheckboxOuter( {checked} ) {
			this.checked = checked;
		},	
		
		addRemoveMovie(index) {
			if(this.checked && !localStorage.title && !localStorage.idd && !localStorage.img) {
				this.favoriteMovies.push(
					{
						id : this.popularMovies.results[index].id,
						title : this.popularMovies.results[index].title,
						img : this.popularMovies.results[index].poster_path,
					},
				);
			} else {
				this.favoriteMovies = this.favoriteMovies.filter(fm => fm.id !== this.popularMovies.results[index].id);
			}

			this.saveMovies();
		},
		
		// removeMovie(index) {
		// 	this.favoriteMovies = this.favoriteMovies.filter(fm => fm.movieId !== this.popularMovies.results[index].id)
		// 	this.saveMovies();
		// },

		saveMovies() {
			const parsed = JSON.stringify(this.favoriteMovies);
			localStorage.setItem('favoriteMovies', parsed);

			this.$emit('refreshFavoriteArray', {favoriteMovies: this.favoriteMovies});
		},

		setHeadersTitleMaxHeight() {
			const tabsHeadSelectors = document.querySelectorAll('.text__title');
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
		}
	}
}
</script>

<style lang="scss" scoped>
	.movies {
		&__container {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			// grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			justify-items: center;
  			grid-gap: 50px 20px;
		}
		&__title {
			margin-bottom: 70px;
			font-size: 35px;
			text-align: center;
			font-family: "Montserrat", sans-serif;
		}
	}

	.movie {
		position: relative;
		max-width: 250px;
		&__favorites-button {
			position: absolute;
			top: 0;
			right: 0;
		}
		&__btn {
			margin-bottom: 15px;
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
		&__date {
			margin-bottom: 20px;
			font-family: "Montserrat", sans-serif;
		}
	}
</style>




