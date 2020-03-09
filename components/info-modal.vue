<template lang="pug">
	transition(name="modal-fade")
		.modal-backdrop
			.modal
				button.modal__btn(type="button" @click="close")
				.movie.modal__movie(v-for="(movie, index) in favoriteMovies" :key="movie.id")
					button.movie__btn(type="button" @click="removeMovie(index)")
					nuxt-link(:to=" 'movies/movie/' + (movie.id) " no-prefetch)
						h4.movie__title {{movie.title}}
						img.movie__img(:src="movie.img ? 'http://image.tmdb.org/t/p/w500/' + movie.img : require('~/static/images/stub-img.png')")
</template>

<script>

export default {
	name: 'info-modal',

	data() {
        return {
			favoriteMovies: [],
        };
    },

    props: {
		refreshData: {
			type: Array
		}
	},

	mounted() {
		this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
	},

    methods: {
		 close() {
			this.$emit('close');
		},

		removeMovie(index) {
			this.favoriteMovies = this.favoriteMovies.filter(fm => fm.id !== this.favoriteMovies[index].id)
			this.saveMovies();

			this.$emit('refreshCheckBoxStatus')
		},

		saveMovies() {
			const parsed = JSON.stringify(this.favoriteMovies);
			localStorage.setItem('favoriteMovies', parsed);
		},
	},
	
	watch: {
		refreshData(newVal, oldVal) {
			this.favoriteMovies = newVal;
		}
	}
}
</script>

<style lang="scss" scoped>
	.modal-fade-enter,
  	.modal-fade-leave-active {
    	opacity: 0;
  	}

	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity .5s ease
	}

	.modal-backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 2;
	}

	.modal {
		position: relative;
		min-height: 100vh;
		height: 100%;
		min-width: 20vw;
		padding: 50px 35px 15px 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 2px 2px 20px 1px;
		overflow-y: auto;
		background-color: #F6F5FF;
		&__btn {
			position: absolute;
			top: 15px;
    		right: 15px;
			width: 20px;
			height: 20px;
			opacity: 0.7;
			transition: opacity .5s ease;
			&::before {
				content: '';
				position: absolute;
				top: 0;
				right: calc(20px / 2);
				height: 20px;
				width: 2px;
				transform: rotate(45deg);
				background-color: #49c5b6;
			}
			&::after {
				content: '';
				position: absolute;
				right: calc(20px / 2);
				top: 0;
				height: 20px;
				width: 2px;
				transform: rotate(-45deg);
				background-color: #49c5b6;
			}
			&:hover {
				opacity: 1;
			}
		}
	}

	.movie {
		position: relative;
		max-width: 200px;
		margin-bottom: 70px;
		&__title {
			margin-bottom: 15px;
			padding-right: 25px;
		}
		&__btn {
			position: absolute;
			top: 0;
			right: 0;
			width: 16px;
			height: 16px;
			opacity: 0.7;
			transition: opacity .5s ease;
			&::before {
				content: '';
				position: absolute;
				top: 0;
				right: calc(16px / 2);
				height: 16px;
				width: 2px;
				transform: rotate(45deg);
				background-color: #ff4c4c;
			}
			&::after {
				content: '';
				position: absolute;
				right: calc(16px / 2);
				top: 0;
				height: 16px;
				width: 2px;
				transform: rotate(-45deg);
				background-color: #ff4c4c;
			}
			&:hover {
				opacity: 1;
			}
		}
		&__img {
			width: 200px;
			height: auto;
		}
	}
</style>




