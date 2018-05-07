<template lang="pug">
el-container
	layout-aside
	el-container
		el-header
			| Header
		el-main
			| Main
		el-footer
			| footer
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState , mapMutations,mapActions} from 'vuex'
import LayoutAside from './layout/Aside.vue'
@Component({
	components:{
		LayoutAside
	},
	computed:{
		...mapState('user',['account','name','address']),
		...mapState('weather',['enable','now']),
		// ...mapActions('user',[''])
	}
})
export default class Admin extends Vue{
	mounted(){
		if(!this.enable){
			console.log('天气不可用')
		}
	}
}
</script>

<style lang="stylus">

</style>
