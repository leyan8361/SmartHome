<template lang="pug">
el-tabs(v-model="activeName" @tab-click='handleClick')
	el-tab-pane(label="收到消息" name="receive") 收到消息
		el-table(:data="family.receive" :row-class-name="unReadRows"
		height="250" style="width: 100%" max-height="250"
		@current-change="handleCurrentChange" tooltip-effect="dark" @selection-change="handleSelectionChange"
			:default-sort = "{prop: 'date', order: 'descending'}")
			el-table-column(type="index" width="50")
			el-table-column(type="selection" width="50" show-overflow-tooltip)
			el-table-column(prop="date" label="日期" width="180" sortablegetCaptcha
			:filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
			:filter-method="filterHandler")
			el-table-column(prop="sender" label="发送者" width="180")
			el-table-column(prop="message" label="内容" width="180")
	el-tab-pane(label="发送消息" name="send") 发送消息
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'

@Component({
	computed:{
		...mapState('user',['news']),
		...mapState('notice',['family'])
	}
})

export default class NoticeFamily extends Vue{
	activeName='receive'
	// receiveMsg =
	created(){
		if(this.news.family > 0){
			/* 消息单条已读 标记10条已读，标记全部为已读*/
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
.el-table .unread-row
	background oldlace

</style>
