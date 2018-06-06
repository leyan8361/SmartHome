<template lang="pug">
el-table(v-if="data.length!==0" :data="data" border
	:row-class-name="unReadRows" style="width:120%"
	height="400" max-height="400" tooltip-effect="dark"
	@current-change="handleCurrentChange" @selection-change="handleSelectionChange")
	el-table-column(prop="date" label="日期" width="120")
	el-table-column(:label="label" width="160")
		template(slot-scope="scope")
			el-popover(trigger="hover" placement="top")
				p 账号：{{scope.row[key].account}}
				p 昵称：{{scope.row[key].name}}
				.name-wrapper(slot="reference")
					el-tag(size="medium") {{scope.row[key].name}}
	el-table-column(prop="message" label="内容")
	el-table-column(v-if="key==='sender'" label="操作")
		template(slot-scope="scope")
			el-button(size="mini" type="primary") 加入共享
			el-button(size="mini" type="danger") 残忍拒绝
.tip-when-no-notice(v-else)
	el-row.title(:span="24" type="flex" align="middle" justify="center")
		| 看来您还没有心仪的人~
	el-row.content(:span="24" type="flex" align="middle" justify="center")
		| 快去邀请家人一起共享设备吧~
	el-row.btn-invite(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="$router.push({name:'FamilySearch'})") 邀请家人
</template>

<script>
import { Component,Vue} from 'vue-property-decorator'
import { mapState,mapMutations } from 'vuex'

@Component({
	computed:{
		...mapState('user',['news'])
	},
	props:{
		data:Array
	},
	watch:{
		'$route'(to,from){
			this.Init()
		}
	}
})
export default class FamilyNotice extends Vue{
	key = 'sender'
	label = '发送者'
	created(){
		this.Init()
	}
	Init(){
		if(this.data[0].receiver.account.length !== 0){
			this.key = 'receiver'
			this.label = '接收者'
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
	handleSelectionChange(val) {
		this.multipleSelection = val
	}
}
</script>

<style lang="stylus">
@import '../assets/css/func'

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
