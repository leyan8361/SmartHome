<template lang="pug">
el-table(v-if="data.length!==0" :data="data"
	:row-class-name="unReadRows" style="width:120%"
	height="400" max-height="400")
	el-table-column(prop="date" label="时间" width="100")
	el-table-column(prop="status" label="状态" width="100")
	el-table-column(:label="label" width="150")
		template(slot-scope="scope")
			el-popover(trigger="hover" placement="top")
				p 账号：{{scope.row[key].account}}
				p 昵称：{{scope.row[key].name}}
				.name-wrapper(slot="reference")
					el-tag(size="medium") {{scope.row[key].name}}
	el-table-column(prop="message" label="内容")
	el-table-column(v-if="key==='sender'" label="操作" width="200")
		template(slot-scope="scope" v-if="scope.row.status==='未回应'")
			el-button(size="mini" type="primary" @click.native="handleJoin(scope.row)") 加入共享
			el-button(size="mini" type="danger" @click.native="handleRefuse(scope.row)") 残忍拒绝
.tip-when-no-notice(v-else)
	el-row.title(:span="24" type="flex" align="middle" justify="center")
		| 看来您还没有心仪的人~
	el-row.content(:span="24" type="flex" align="middle" justify="center")
		| 快去邀请家人一起共享设备吧~
	el-row.btn-invite(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="$router.push({name:'UserSearch'})") 邀请家人
</template>

<script>
import { Component,Vue} from 'vue-property-decorator'
import { mapActions,mapState,mapMutations } from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	props:{
		data:Array,
		unReadNews:Number
	},
	computed:{
		...mapState('user',['account','name','families'])
	},
	methods:{
		...mapActions('notice',['refuse','agree']),
		...mapMutations('notice',['setNoticeStatus'])
	}
})
export default class NoticeFamily extends Vue{
	key = 'sender'
	label = '发送者'
	created(){
		if(this.data[0].receiver && this.data[0].receiver.account.length ){
			this.key = 'receiver'
			this.label = '接收者'
		}
	}
	unReadRows({row,rowIndex}){
		if(rowIndex < this.unReadNews){
			return 'unread-row'
		}
	}
	toJoin(receipts){
		this.agree(receipts).then(e=>{
			if(e.success){
				notice.success(e.message,'成功')
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
	handleJoin({sender:receiver,id,families}){
		const conflictFamily = []
		this.families.forEach(e=>{
			families.forEach((o,i)=>{
				if(o.name === e.name){
					conflictFamily.push(e)
					families.splice(i,1)
				}
			})
		})
		const receipts = {
			receiver,
			id,
			families,
			sender : {
				name:this.name,
				account:this.account
			}
		}
		if(conflictFamily.length){
			this.$confirm(`由于您与对方有共同家庭，经过筛选，您将加入${families.map(e=>e.displayName).join('、')}家庭, 是否继续?`, '提示', {
				confirmButtonText: '继续',
				cancelButtonText: '取消',
				type: 'info'
			}).then(()=>{
				this.toJoin(receipts)
			}).catch(()=>{})
		}else{
			this.toJoin(receipts)
		}
	}
	handleRefuse({sender:receiver,status,id}){
		const receipts = {
			sender:{
				name:this.name,
				account:this.account
			},
			receiver,
			id
		}
		this.refuse(receipts).then(e=>{
			if(e.success){
				notice.success(e.message,'成功')
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
}
</script>

<style lang="stylus">

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
