<template lang="pug">
.notice-usagelog-component
	el-table.usagelog-table(v-if="usagelogs.length!==0" :data="usagelogs" :row-class-name="unReadRows" :height="470")
		el-table-column(prop="date" label="时间")
		el-table-column(prop="name" label="操作电器")
		el-table-column(prop="showStatus" label="状态")
		el-table-column(prop="brightness" label="亮度")
		el-table-column(prop="color" label="颜色")
		el-table-column(prop="isScript" label="指令控制")
	usagelog-is-null(v-else :bulbs-are-null="bulbs.length===0")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState,mapActions } from 'vuex'
import UsagelogIsNull from '~/usagelog/IsNull'

@Component({
	components:{
		UsagelogIsNull
	},
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
.notice-usagelog-component
	margin-top 20px
	border-radius 10px
</style>
