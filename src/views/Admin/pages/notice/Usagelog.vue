<template lang="pug">
.usagelog-component
	el-table.usagelog-table(v-if="usagelogs.length!==0" :data="usagelogs" :row-class-name="unReadRows" :height="470")
		el-table-column(prop="date" label="时间")
		el-table-column(prop="name" label="操作电器")
		el-table-column(prop="showStatus" label="状态")
		el-table-column(prop="brightness" label="亮度")
		el-table-column(prop="color" label="颜色")
		el-table-column(prop="isScript" label="指令控制")
	.when-usagelogs-is-null(v-else :span="24" type="flex" align="middle" justify="center")
		el-row.usagelogs-tip(v-html="getTip()")
		el-row.controll-electric-button
			el-button(type="success" @click.native="$router.push({name:'ElectricView'})") 控制电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState,mapActions } from 'vuex'

@Component({
	computed:{
		...mapState('user',['news']),
		...mapState('usagelog',['usagelogs']),
		...mapState('electrics',['bulbs'])
	},
	methods:{
		...mapActions('user',['newsToZero'])
	}
})
export default class NoticeUsagelog extends Vue{
	unReadNews = 0
	getTip(){
		if(this.bulbs.length === 0){
			return '您目前还没有自己的电器哦~'
		}
		return '您目前暂无操作日志哦~ <br/><p>还在等什么，快去操作您的电器吧！</p>'
	}
	created(){
		this.unReadNews = this.news.electric
		!!this.news.electric && this.newsToZero('electric')
	}
	unReadRows({row,rowIndex}){
		if(rowIndex < this.unReadNews){
			return 'unread-row'
		}
	}
}
</script>

<style lang="stylus">
.unread-row
	background oldlace !important
.usagelog-component
	margin-top 20px
	border-radius 10px
.when-usagelogs-is-null
	font-beautify()
	margin 140px auto
	.controll-electric-button
		margin-top 50px
	.usagelogs-tip
		& *
			margin 20px 0
</style>
