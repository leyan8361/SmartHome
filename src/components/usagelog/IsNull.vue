<template lang="pug">
.when-usagelogs-is-null(:span="24" type="flex" align="middle" justify="center")
		el-row.usagelogs-tip(v-html="getTip()")
		el-row.controll-electric-button
			el-button(type="success" @click.native="$router.push({name:'ElectricView'})") 控制电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component({
	props:{
		BulbsAreNull:Boolean
	}
})
export default class UsagelogIsNull extends Vue{
	getTip(){
		if(this.BulbsAreNull){
			return '您目前还没有自己的电器哦~'
		}
		return '您目前暂无操作日志哦~ <br/><p>还在等什么，快去操作您的电器吧！</p>'
	}
}
</script>

<style lang="stylus">
.when-usagelogs-is-null
	font-beautify()
	margin 140px auto
	font-size .9em
	.controll-electric-button
		margin-top 50px
	.usagelogs-tip
		& *
			margin 20px 0
			white-space nowrap
</style>
