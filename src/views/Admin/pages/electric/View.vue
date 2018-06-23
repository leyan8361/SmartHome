<template lang="pug">
.electric-admin
	.electric-show(v-if="bulbs.length!==0")
		el-carousel.electric-carousel(trigger="click" :autoplay="false" @change="changeCurrBulb")
			el-carousel-item.electric-carousel-item(v-for="(bulb,index) in bulbs" :key="index" )
				bulb-card(:bulb="bulb")
		.curr-bulb-info(:span="24" type="flex" align="middle" justify="center")
			el-row: | 亮度：{{bulb.brightness + '%'}}
			el-row: | 颜色：{{bulb.color}}
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button.open-setting(type="primary" @click="isShowBulb=true") 打开设置
		bulb-form(:is-show-bulb.sync="isShowBulb" :bulb.sync="bulb" :index="index")
	electric-is-null(v-else)
</template>

<script>
import { Component,Vue} from 'vue-property-decorator'
import {mapState } from 'vuex'
import BulbCard from '~/bulb/Card'
import ElectricIsNull from '~/electric/IsNull'
import BulbForm from '~/dialog/bulb/Form'

@Component({
	computed:{
		...mapState('electrics',['bulbs'])
	},
	components:{
		BulbCard,
		BulbForm,
		ElectricIsNull
	}
})
export default class ElectricView extends Vue{
	bulb={ }
	isShowBulb = false
	index = 0
	changeCurrBulb(index){
		this.bulb = this.bulbs[index]
		this.index = index
	}
	created(){
		this.bulb = this.bulbs[0]
	}

}
</script>

<style lang="stylus">
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
