<template lang="pug">
.electric-add-component
	el-form.bulb-add-form(:model="bulb" label-width="100px"  center status-ico)
		el-form-item(label="状态")
			bulb-check-box.bulb-checkbox(:status.sync="bulb.status")
		el-form-item(label="亮度")
			el-slider.brightness-slider(v-model="bulb.brightness")
		el-form-item(label="颜色")
			bulb-color-select(:color.sync="bulb.color")
		el-form-item.electric-form-input(label="ID")
			el-input(type="text" v-model.trim="bulb.id" auto-complete='on' placeholder="产品上面的 ID 号" clearable)
		el-form-item.electric-form-input(label="备注")
			el-input(type="text" v-model.trim="bulb.name" auto-complete='on' placeholder="最多16位字符" clearable)
	el-row(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="submitForm" :loading="isLoading") 增加电器
	.bulb-add-tip
		h3.bulb-add-tip-title: | 增加电器前提
		el-row
			| 1. 电器已连接家中局域网
		el-row
			| 2. 如果想单独控制电器，电器的 id 号 需与已有 id 号互不相同
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import BulbCheckBox from '~/bulb/CheckBox'
import BulbColorSelect from '~/bulb/ColorSelect'

import { mapActions,mapState } from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	components: {
		BulbCheckBox,
		BulbColorSelect
	},
	props: {
		isShowAddDialog: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	methods: {
		...mapActions('electrics', ['addBulb'])
	}
})
export default class BulbAdd extends Vue{
	bulb={
		name:'',
		id:'',
		status:true,
		brightness:100,
		color:'自然光'
	}
	isLoading = false
	submitForm() {
		if(!this.bulb.id || this.bulb.id.length > 16){
			return notice.warning('请输入正确的产品 ID 号')
		}
		if(!this.bulb.name || this.bulb.name.length > 16){
			return notice.warning('请输入正确的备注')
		}
		this.isLoading = true
		this.bulb.showStatus = this.bulb.status ? '开' : '关'
		this.addBulb(this.bulb).then(e=>{
			this.isLoading = false
			if(e.success){
				notice.success(e.message,'成功').then(()=>{
					this.$router.push({name:'ElectricAdmin'})
				})
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
}
</script>

<style lang="stylus">
.electric-add-component
	font-beautify()
	margin 30px 150px 150px
	.bulb-checkbox
		transform translateX(-100px)
.bulb-add-form
	width 400px
.bulb-add-tip
	font-size .8em
	position fixed
	bottom 60px
	& *
		padding 5px 0
.brightness-slider
	width 80%

.electric-form-input
	width 86%
</style>
