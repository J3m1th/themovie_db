<template lang="pug">
	transition(name="modal-fade")
		.modal-backdrop
			.modal
				button.modal__btn(type="button" @click="close") X
				.movie.modal__movie(v-for="(movie, index) in favoriteMovies" :key="movie.id")
					button.movie__btn(type="button" @click="removeMovie(index)") X
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
		},

		saveMovies() {
			const parsed = JSON.stringify(this.favoriteMovies);
			localStorage.setItem('favoriteMovies', parsed);
		},
	},
	
	watch: {
		refreshData(newVal, oldVal) {
			// console.log("refreshPlease")
			// console.log(newVal)
			// console.log(oldVal)
			// console.log("-- refreshPlease -- ")

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
		min-width: 25vw;
		padding: 35px 15px 15px 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 2px 2px 20px 1px;
		overflow-y: auto;
		background-color: #F6F5FF;
		&__btn {
			position: absolute;
			top: 10px;
			right: 20px;
			border: none;
			font-size: 15px;
			padding: 10px;
			// font-weight: bold;
			color: #49c5b6;
			background: transparent;
			cursor: pointer;
		}
	}

	.movie {
		position: relative;
		max-width: 200px;
		margin-bottom: 70px;
		// text-align: center;
		&__title {
			// max-width: 50%;
			margin-bottom: 15px;
			padding-right: 25px;
		}
		&__btn {
			position: absolute;
			top: 0;
			right: 0;
			color: red;
		}
		&__img {
			width: 200px;
			height: auto;
		}
	}
</style>




