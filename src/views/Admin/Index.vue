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
		...mapActions('user',[''])
	}
})
export default class Admin extends Vue{
	created(){
		/* 获取天气信息 */
	}
	mounted(){
	}
}
</script>

<style lang="stylus">

</style>
