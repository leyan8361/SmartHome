<template lang="pug">
#app
	transition(:name="animation")
		router-view
	night-model
</template>
<script>
import {Component,Vue} from 'vue-property-decorator'
import NightModel from '~/element/NightModel'
import {getRandomAnimation} from '@/utils/ui/animation'

@Component({
	components:{
		NightModel
	},
	watch:{
		'$route'(to,from){
			this.changeAnimation()
		}
	}
})
export default class App extends Vue{
	animation = getRandomAnimation()
	changeAnimation(){
		this.animation = getRandomAnimation()
	}
}
</script>
