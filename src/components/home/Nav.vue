<template lang="pug">
.nav
	.nav-item(
		v-for="item in maxItem" :key="item" :data-index="item"
		:class="{active:activeItem === item}" @click="changeActive($event)"
		)
</template>

<script>
import { Vue, Component} from 'vue-property-decorator'

@Component({
	props:{
		activeItem:{
		required: true,
			validator: value => {
				return value >= 0 && value < 3
			}
		},
		maxItem:{
			required: true,
			validator: value => {
				return value >= 0 && value < 10
			}
		}
	}
})
export default class HomeNav extends Vue {
	changeActive({ target: { dataset: { index } } }) {
		index = Number.parseInt(index)
		if (index === this.activeItem) {
			return
		}
		this.$emit('changeActive', index)
	}
}
</script>

<style lang="stylus">
.nav
	position fixed
	right 2vw
	top 50vh
	transform translateY(-50%)
	z-index 999
	.nav-item
		width: 4px;
		height: 25px;
		transition: all linear .3s;
		margin 2vh auto
		text-align center
		cursor pointer
		background-color: rgba(77, 112, 255, 0.1);
		&:hover:not(.active)
			background-color skyBlue
			color #fff
			transform translateY(-1px)
		&.active
			background-color #7cd1ec

</style>
