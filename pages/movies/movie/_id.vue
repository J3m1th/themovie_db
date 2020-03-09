<template lang="pug">
	.container
		info-block(:page="getMoviePageById" :genreMovieList="getGenreMovieList")
		nuxt-link.container__btn(to="/movies") Back
</template>

<script>

import { mapGetters } from "vuex";
import { mapState } from "vuex";

import infoBlock from '~/components/movie/info-block.vue';

export default {
	components: {
		'info-block': infoBlock
	},

	data() {
		return {
			id: this.$route.params.id,
		}
	},

	computed: {
		...mapGetters({
			'getMoviePageById': 'movies/getMoviePageById',
			'getGenreMovieList': 'movies/getGenreMovieList',
		}),
	},

	mounted() {
		this.$store.dispatch('movies/fetchMoviePage', this.id);
		this.$store.dispatch('movies/fetchMovieGenres');
	},
}

</script>

<style lang="scss" scoped>

.container {
	position: relative;
	min-height: 100vh;
	padding: 50px 20px 50px 20px;
	&__btn {
		position: absolute;
		top: 20px;
		left: 20px;
		font-family: "Montserrat", sans-serif;
		font-weight: 700;
		opacity: .6;
		transition: opacity .5s ease;
		&:hover {
			opacity: 1;
		}
	}
}

</style>

