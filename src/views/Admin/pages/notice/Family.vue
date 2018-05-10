<template lang="pug">
.user-info
	el-row.user-avatar(:span="24" type="flex" align="middle" justify="center")
		img(:src="avatar")
	el-row.user-name(v-text="`昵称：${name}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-account(v-text="`账号：${account}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-address(v-text="`地址：${getAddress}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-family(:span="24" type="flex" align="middle" justify="center")
		| 家庭关系
	el-row.user-electric(:span="24" type="flex" align="middle" justify="center")
		| 电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapActions} from 'vuex'
@Component({
	computed:{
		...mapState('user',['news'])
	},
	methods:{
		...mapActions('user',['readNew'])
	}
})
export default class NoticeFamily extends Vue{
	created(){
		if(this.news.family>0){
			/* 消息单条已读 标记10条已读，标记全部为已读*/
		}
	}
}
</script>

<style lang="stylus">

</style>
