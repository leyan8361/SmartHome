<template lang="pug">
	#wrap
		| Hello world
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState , mapMutations,mapActions} from 'vuex'
@Component({
	computed:{
		...mapState('user',['account','name','address']),
		...mapState('weather',['enable','weatherInfo']),
		...mapActions('user',[''])
	}
})
export default class Admin extends Vue{
	created(){

	}
	mounted(){
		if(!this.enable){
			console.log('天气不可用')
		}
	}
}
</script>

<style lang="stylus">

</style>
