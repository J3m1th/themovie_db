<template lang="pug">
	.block
		label.block__label(:class="{'selected': (checkedClass || checkPlease)}" title="Favorite movies")
			input.block__checkbox(type="checkbox" @change="checkInput(); addRemoveMovie()" :value="checked" v-model="checked")
			| ❤
</template>

<script>

export default {
	name: 'favorites-button',

	data() {
        return {
			checkedClass: false,

			checked: false,
			favoriteMovies: [],
			movieId: '',
        };
    },

    props: {
		checkPlease: {
			type: Boolean
		},
		// 'checked': {
        //     type: Boolean,
        //     default: false
		// },
	},

	mounted() {
		this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
	},
	
    methods: {
		checkInput() {
			this.$emit('toggle-checkbox', {checked: this.checked});
		},
		addRemoveMovie() {
			this.$emit('add-remove-movie');
		}
	
	},
	
	watch: {
		checked(newVal, oldVal) {
			this.checkedClass = newVal;
		},
		// checkPlease(newVal, oldValue) {
		// 	console.log('checkPlease')
		// 	console.log(newVal)
		// 	console.log(oldValue)
		// 	console.log('-checkPlease-')
		// 	this.checkedClass = newVal;
		// }
	}
}
</script>

<style lang="scss" scoped>
	.block {
		display: inline-block;
		min-width: 22px;
		text-align: right;
		&__label {
			display: inline-block;
			padding: 3px;
			vertical-align: middle;
			line-height: 1;
			font-size: 16px;
			color: #ABABAB;
			cursor: pointer;
			transition: color .5s ease-out;
			&.selected {
				color: #df470b;
			}
		}
		&__checkbox {
			position: absolute;
			overflow: hidden;
			clip: rect(0 0 0 0);
			height: 1px;
			width: 1px;
			margin: -1px;
			padding: 0;
			border: 0;
		}
	}
</style>




