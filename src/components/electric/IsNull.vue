<template lang="pug">
.tip-when-no-electric
	el-row.title(:span="24" type="flex" align="middle" justify="center")
		| 您还没有自己的器~
	el-row.content(:span="24" type="flex" align="middle" justify="center")
		| 快去添加自己家中的电器吧~
	el-row.btn-add-electric(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="$router.push({name:'ElectricAdd'})") 添加电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component
export default class ElectricIsNull extends Vue{ }
</script>

<style lang="stylus">
.tip-when-no-electric
	font-beautify()
	margin 120px
	.title
		padding-bottom 40px
	.btn-add-electric
		padding 20px
		margin-top 50px
		letter-spacing 2px

</style>
