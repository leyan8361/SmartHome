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
import LayoutAside from './layout/Aside'
import LayoutHeader from './layout/Header'
import LayoutMain from './layout/Main'
import LayoutFooter from './layout/Footer'

@Component({
	components:{
		LayoutAside,
		LayoutHeader,
		LayoutMain,
		LayoutFooter
	},
	computed:{
		...mapState('user',['account','name','address','avatar']),

		...mapState('weather',['now'])
	}
})
export default class Admin extends Vue{
	mounted(){
	}
}
</script>

<style lang="stylus">

</style>
