<template lang="pug">
	section.movie
		img.movie__img(:src="page.poster_path ? 'http://image.tmdb.org/t/p/w500/' + page.poster_path : require('~/static/images/stub-img.png')")
		.info.movie__info
			favorites-button.info__favorites-button(@add-remove-movie="addRemoveMovie()" @toggle-checkbox="toggleCheckboxOuter" :checkPlease="isThisFilmInFavorite(page)")
			h2.info__title {{page.title}}
			.info__date {{page.release_date}}
			.info__genres-wrap
				.info__genres(v-for="genre in page.genres" :key="genre.id")
					.info__genre {{genre.name}}
			.info__average {{page.vote_average}}
			p.info__description {{page.overview}}
			img.info__img(:src="page.backdrop_path ? 'http://image.tmdb.org/t/p/w500/' + page.backdrop_path : require('~/static/images/stub-img.png')")
			
</template>

<script>

import favoritesButton from '~/components/favorites-button.vue';

export default {
	name: 'info-block',

	components: {
		'favorites-button': favoritesButton
	},

	props: ['page', 'genreMovieList'],

	data(){
		return {
			checked: false,
			favoriteMovies: [],
		}
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

	methods: {
		toggleCheckboxOuter( {checked} ) {
			this.checked = checked;
		},

		isThisFilmInFavorite(item) {
			return !!this.favoriteMovies.find(element => element.id == item.id);
		},

		addRemoveMovie(index) {
			if(this.checked) {
				this.favoriteMovies.push(
					{
						id : this.page.id,
						title : this.page.title,
						img : this.page.poster_path,
					},
				);

			} else {
				this.favoriteMovies = this.favoriteMovies.filter(fm => fm.id !== this.page.id);
			}

			this.saveMovies();
		},
		
		saveMovies() {
			const parsed = JSON.stringify(this.favoriteMovies);
			localStorage.setItem('favoriteMovies', parsed);
		},
	}
}
</script>

<style lang="scss" scoped>
	.movie {
		display: flex;
		&__img {
			width: 450px;
			height: auto;
			object-fit: contain;
			margin-right: 45px;
		}
		
	}

	.info {
		position: relative;
		max-width: 450px;
		font-family: "Montserrat", sans-serif;
		&__favorites-button {
			position: absolute;
			top: 0;
			right: 0;
		}
		&__title {
			margin-bottom: 15px;
			padding-right: 25px;
			line-height: 1;
		}
		&__date {
			margin-bottom: 15px;
		}
		&__genres-wrap {
			margin-bottom: 15px;
		}
		&__genres {
			display: inline-block;
			margin-right: 10px;
			font-weight: 300;
		}
		&__average {
			display: inline-block;
			padding-left: 8px;
			padding-right: 8px;
			margin-bottom: 15px;
			background-color: #bfff00;
			border-radius: 5px; 
			font-weight: 700;
			line-height: 30px;
		}
		&__description {
			margin-bottom: 15px;
		}
		&__img {
			width: 450px;
			height: auto;
			object-fit: contain;
		}
	}

	// media queries
	@media (max-width: 1024px) {
		.movie {
			flex-direction: column;
			justify-content: center;
			margin: 0 auto;
		}
	}
</style>




