<template lang="pug">
el-container
	layout-aside
	el-container
		layout-header
		layout-main
		layout-footer
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState , mapMutations,mapActions} from 'vuex'
import LayoutAside from './layout/Aside.vue'
import LayoutHeader from './layout/Header.vue'
import LayoutMain from './layout/Main.vue'
import LayoutFooter from './layout/Footer.vue'
@Component({
	components:{
		LayoutAside,
		LayoutHeader,
		LayoutMain,
		LayoutFooter
	},
	computed:{
		...mapState('user',['account','name','address','avatar']),

		...mapState('weather',['enable','now']),
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
