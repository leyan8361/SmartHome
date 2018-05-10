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

@Component({

})
export default class NoticeFamily extends Vue{
	created(){
		alert(2)
	}
}
</script>

<style lang="stylus">

</style>
