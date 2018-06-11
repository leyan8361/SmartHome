<template lang="pug">
.electric-admin
	.electric-show(v-if="bulbs.length!==0")
		el-carousel.electric-carousel(trigger="click" :autoplay="false" @change="changeCurrBulb")
			el-carousel-item.electric-carousel-item(v-for="(bulb,index) in bulbs" :key="index" )
				set-bulb(:bulb="bulb")
		.curr-bulb-info(:span="24" type="flex" align="middle" justify="center")
			el-row: | 亮度：{{bulb.brightness + '%'}}
			el-row: | 颜色：{{bulb.color}}
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button.open-setting(type="primary" @click="isShowBulb=true") 打开设置
		bulb-form(:is-show-bulb.sync="isShowBulb" :bulb.sync="bulb")
	.tip-when-no-electric(v-else)
		el-row.title(:span="24" type="flex" align="middle" justify="center")
			| 您还没有自己的器~
		el-row.content(:span="24" type="flex" align="middle" justify="center")
			| 快去添加自己家中的电器吧~
		el-row.btn-add-electric(:span="24" type="flex" align="middle" justify="center")
			el-button(type="primary" @click="$router.push({name:'ElectricAdmin'})") 添加电器

</template>

<script>
import { Component,Vue} from 'vue-property-decorator'
import {mapState } from 'vuex'
import SetBulb from '~/SetBulb.vue'

import BulbForm from '@/views/Admin/form/Bulb.vue'

@Component({
	computed:{
		...mapState('electrics',['bulbs'])
	},
	components:{
		SetBulb,
		BulbForm
	},
	'$router'(to,from){
		this.Init()
	}
})
export default class ElectricAdmin extends Vue{
	bulb={ }
	isShowBulb = false
	changeCurrBulb(index){
		this.bulb = this.bulbs[index]
	}
	Init(){
		this.bulb = this.bulbs[0]
	}
	created(){
		this.Init()
	}

}
</script>

<style lang="stylus">
@import '../../../../assets/css/func'
.tip-when-no-electric
	font-beautify()
	margin 120px
	.title
		padding-bottom 40px
	.btn-add-electric
		padding 20px
		margin-top 50px
		letter-spacing 2px

.electric-show
	margin-top 20px
	.electric-carousel
		box-shadow 5px 5px 10px #ccc
		border-radius 6px
		&-item
			background-color #666

.curr-bulb-info
	font-beautify()
	margin 20px auto
	& *
		padding 10px
</style>
