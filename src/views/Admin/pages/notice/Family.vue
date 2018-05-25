<template lang="pug">
.notice-family
	el-tabs(v-model="familyTab" @tab-click='handleClick')
		el-tab-pane.notice-family-table(label="收到消息" name="receive")

			el-table(v-if="family.receive.length!==0" :data="family.receive"
			:row-class-name="unReadRows" style="width:120%"
			height="400" max-height="400" tooltip-effect="dark"
			@current-change="handleCurrentChange" @selection-change="handleSelectionChange"
			:default-sort = "{prop: 'date', order: 'descending'}")
				el-table-column(prop="date" label="日期" sortable width="120")
				el-table-column(label="发送者" width="160")
					template(slot-scope="scope")
						el-popover(trigger="hover" placement="top")
							p 账号：{{scope.row.sender.account}}
							p 昵称：{{scope.row.sender.name}}
							.name-wrapper(slot="reference")
								el-tag(size="medium") {{scope.row.sender.name}}
				el-table-column(prop="message" label="内容")
				el-table-column(label="操作")
					template(slot-scope="scope")
						el-button(size="mini" type="primary") 加入共享
						el-button(size="mini" type="danger") 残忍拒绝
			.tip-when-no-notice(v-else)
				el-row.title(:span="24" type="flex" align="middle" justify="center")
					| 还没有被人邀请？
				el-row.content(:span="24" type="flex" align="middle" justify="center")
					| 快去邀请家人一起共享设备吧~
				el-row.btn-invite(:span="24" type="flex" align="middle" justify="center")
					el-button(type="primary" @click="$router.push({name:'FamilySearch'})") 邀请家人
		el-tab-pane.notice-family-table(label="发送消息" name="send")
			el-table(v-if="family.send.length!==0" :data="family.send"
			:row-class-name="unReadRows"
			height="250" style="width: 100%" max-height="250" tooltip-effect="dark"
			@current-change="handleCurrentChange" @selection-change="handleSelectionChange"
			:default-sort = "{prop: 'date', order: 'descending'}")
				el-table-column(type="index" width="50")
				el-table-column(type="selection" width="50" show-overflow-tooltip)
				el-table-column(prop="date" label="日期" width="180" sortable)
				el-table-column(label="接收者" width="180")
					template(slot-scope="scope")
						el-popover(trigger="hover" placement="top")
							p 账号：{{scope.row.receiver.account}}
							p 昵称：{{scope.row.receiver.name}}
							.name-wrapper(slot="reference")
								el-tag(size="medium") {{scope.row.receiver.name}}
				el-table-column(prop="message" label="内容" width="180")
			.tip-when-no-notice(v-else)
				el-row.title(:span="24" type="flex" align="middle" justify="center")
					| 看来您还没有心仪的人~
				el-row.content(:span="24" type="flex" align="middle" justify="center")
					| 快去邀请家人一起共享设备吧~
				el-row.btn-invite(:span="24" type="flex" align="middle" justify="center")
					el-button(type="primary" @click="$router.push({name:'FamilySearch'})") 邀请家人
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapActions,mapMutations} from 'vuex'

@Component({
	computed:{
		...mapState('user',['news']),
		...mapState('notice',['family']),
		...mapState('ui',['familyTab'])
	},
	methods:{
		...mapActions('user',['newsToZero']),
		...mapMutations('ui',['setFamilyTab'])

	},
	watch:{
		'$route'(to,from){
			this.Init()
		}
	}
})

export default class NoticeFamily extends Vue{
	created(){
		this.Init()
	}
	Init(){
		!!this.news && this.newsToZero('family')
		if(this.familyTab === 'other'){
			this.setFamilyTab('send')
			// family.send = this.getSendNotice()
		}else if(this.familyTab === 'send'){
			this.sendFamilyTab('receive')
		}
	}
	unReadRows({row,rowIndex}){
		for(let i = 0;i < this.news.family;++i){
			return 'unread-row'
		}
	}
	handleCurrentChange(val) {
		this.currentRow = val
	}
	setCurrent(row) {
		this.$refs.singleTable.setCurrentRow(row)
	}
	handleSelectionChange(val) {
		this.multipleSelection = val
	}
	toggleSelection(rows) {
		if (rows) {
			rows.forEach(row => {
				this.$refs.multipleTable.toggleRowSelection(row)
			})
		} else {
			this.$refs.multipleTable.clearSelection()
		}
	}
	filterTag(value, row) {
		return row.tag === value
	}
	filterHandler(value, row, column) {
		const property = column['property']
		return row[property] === value
	}
}
</script>

<style lang="stylus">
@import '../../../../assets/css/func'
.notice-family
	margin-top 30px
.el-table
	letter-spacing 2px
	color #333
	font-weight 300
	text-shadow 0 0 1px #ccc
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif
	.unread-row
		background oldlace
.tip-when-no-notice
	font-beautify()
	margin 80px
	.title
		padding-bottom 40px
	.btn-invite
		padding 20px
		margin-top 50px
		letter-spacing 2px
</style>
