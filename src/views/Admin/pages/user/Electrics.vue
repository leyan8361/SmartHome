<template lang="pug">
.user-electric-component
	el-table.electrics-table(v-if="bulbs.length!==0" :data="bulbs" height="450")
		el-table-column(prop="name" label="备注")
		el-table-column(prop="id" label="ID")
		el-table-column(prop="showStatus" label="状态")
		el-table-column(prop="brightness" label="亮度")
		el-table-column(prop="color" label="颜色")
	electric-is-null(v-else)
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'
import ElectricIsNull from '~/electric/ElectricIsNull'

@Component({
	computed:{
		...mapState('electrics',['bulbs'])
	},
	components:{
		ElectricIsNull
	}
})
export default class User extends Vue{}
</script>

<style lang="stylus">
.user-electric-component
	margin-top 10px
	padding 20px
.electrics-table
	box-shadow 0 2px 10px #ccc
	border-radius 5px
</style>
